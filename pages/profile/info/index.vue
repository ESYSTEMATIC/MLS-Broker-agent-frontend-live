<script setup>
import * as yup from "yup";
import { configure } from "vee-validate";
import { useToast } from "vue-toastification";
import { useAuthStore } from "~/store/auth";
import { localeCodes } from "#build/i18n.options.mjs";

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnModalUpdate: true,
  validateOnInput: true,
});

definePageMeta({
  layout: "profile",
});

const i18n = useI18n();

useHead({
  title: i18n.t("TITLES.profile"),
});

const toast = useToast();

const axios = useNuxtApp().$axios;

const authStore = useAuthStore();
const { profileData } = storeToRefs(authStore);
/* Start of the function that update profile image */
const profileImage = ref(profileData.value ? profileData.value.image : null);

const updateImageLoading = ref(false);
async function handleChange(e) {
  if (e.target.files.length) {
    if (e.target.files[0].type.includes("image")) {
      updateImageLoading.value = true;

      await axios
        .post(
          "account/updateImage",
          {
            image: e.target.files[0],
            _method: "PUT",
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
        .then((res) => {
          toast.success(i18n.t("TEXTS.profileImageHasBeenUpdatedSuccessfully"));

          profileImage.value = res.data.data.User.image;

          profileData.value = {
            ...profileData.value,
            image: profileImage.value,
          };

          localStorage.setItem(
            "profileData",
            JSON.stringify(profileData.value),
          );
        })
        .catch((e) => {
          console.error(e);

          toast.error(e.response._data.Error[0]);
        })
        .finally(() => (updateImageLoading.value = false));
    } else {
      toast.error(i18n.t("ERRORS.youMustUploadImageIOnly"));
    }
  }
}
/* End of the function that update profile image */

/* Start of the function that update profile */
const initialValues = ref({});

const schema = yup.object().shape({
  fullName: yup.string().required(i18n.t("ERRORS.fullNameRequired")),
  // address: yup.string().required(i18n.t("ERRORS.addressRequired")),
  phoneNumber: yup.string().required(i18n.t("ERRORS.phoneNumberRequired")),
  // faxNumber: yup.string().required(i18n.t("ERRORS.faxNumberRequired")),
  email: yup
    .string()
    .required(i18n.t("ERRORS.emailRequired"))
    .email(i18n.t("ERRORS.invalidEmail")),
  status: yup.string().required(i18n.t("ERRORS.statusRequired")),
  // officeName: yup.string().required(i18n.t("ERRORS.officeNameRequired")),
  // officeAddress: yup.string().required(i18n.t("ERRORS.officeAddressRequired")),
  // directPhoneNumber: yup
  //   .string()
  //   .required(i18n.t("ERRORS.phoneNumberRequired")),
  // officeTaxId: yup.string().required(i18n.t("ERRORS.taxIdRequired")),
  // commercialRegistration: yup
  //   .string()
  //   .required(i18n.t("ERRORS.commercialRegistrationRequired")),
  mlsID: yup.string().required(i18n.t("ERRORS.mlsIDRequired")),
});

const communicationPreference = ref([]);

const updateProfileLoading = ref(true);
async function handleUpdateProfile() {
  let type =
    profileData.value.application_type == "broker"
      ? "broker"
      : "developer";
  console.log(profileData.value);
  
    initialValues.value = {
      mlsID: profileData.value.mls_id,
      fullName: profileData.value.name,
      phoneNumber: profileData.value.phone,
      // faxNumber: profileData.value.broker.brokerage_fax_number,
      email: profileData.value.email,
      status: profileData.value.approved ? "1" : "0",
      // officeName: profileData.value.broker.name,
      // officeAddress: profileData.value.broker.principal_place_of_business,
      // directPhoneNumber:
      //   profileData.value.broker.country_code_direct_phone_number +
      //   " " +
      //   profileData.value.broker.direct_phone_number,
      // officeTaxId: profileData.value.broker.brokerage_tax_id,
      // commercialRegistration:
      //   profileData.value.broker.brokerage_commercial_registration,
    };

  if (+profileData.value.contact_via_phone) {
    communicationPreference.value.push("phone");
  }

  if (+profileData.value.send_emails) {
    communicationPreference.value.push("email");
  }

  if (+profileData.value.send_text_messages) {
    communicationPreference.value.push("text");
  }

  updateProfileLoading.value = false;
}

watch(
  () => profileData.value,
  (obj) => {
    if (Object.keys(obj).length) {
      handleUpdateProfile();
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
/* End of the function that update profile  */

/* Start of the function that handle update password */
const updatePasswordModal = ref(false);

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required(i18n.t("ERRORS.passwordRequired")),
  newPassword: yup
    .string()
    .required(i18n.t("ERRORS.passwordRequired"))
    .test(
      "newPassword",
      i18n.t("ERRORS.newPasswordMatchesOldOne"),
      (value, ctx) => {
        if (value) {
          return ctx.from[0].value.oldPassword !== value;
        } else {
          return true;
        }
      },
    )
    .min(6, i18n.t("ERRORS.passwordMinLength")),
  confirmNewPassword: yup
    .string()
    .required(i18n.t("ERRORS.passwordRequired"))
    .when("newPassword", (password, field) =>
      password
        ? field
            .required(i18n.t("ERRORS.passwordRequired"))
            .oneOf([yup.ref("newPassword")], i18n.t("ERRORS.passwordsNotMatch"))
        : field,
    ),
});

const updatePasswordLoading = ref(false);
async function handleUpdatePassword(values) {
  updatePasswordLoading.value = true;

  await axios
    .post("update-profile", {
      old_password: values.oldPassword,
      password: values.newPassword,
      password_confirmation: values.confirmNewPassword,
      _method: "PUT",
    })
    .then(() => {
      toast.success(i18n.t("TEXTS.passwordUpdatedSuccessfully"));

      updatePasswordModal.value = false;
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (updatePasswordLoading.value = false));
}
/* End of the function that handle update password */
</script>

<template>
  <div>
    <!-- Start of the update password modal -->
    <Teleport to="body">
      <GlobalsModal
        v-if="updatePasswordModal"
        :title="$t('TITLES.changePassword')"
        :disabled="updatePasswordLoading"
        @close="updatePasswordModal = false"
      >
        <VeeForm
          as="div"
          :validation-schema="passwordSchema"
          @submit="handleUpdatePassword"
        >
          <form class="space-y-3">
            <InputsBaseInput
              id="oldPassword"
              type="password"
              name="oldPassword"
              :label="$t('LABELS.oldPassword')"
              :placeholder="$t('INPUTS.oldPasswordPlaceholder')"
            />

            <InputsBaseInput
              id="newPassword"
              type="password"
              name="newPassword"
              :label="$t('LABELS.newPassword')"
              :placeholder="$t('INPUTS.newPasswordPlaceholder')"
            />

            <InputsBaseInput
              id="confirmNewPassword"
              type="password"
              name="confirmNewPassword"
              :label="$t('LABELS.confirmNewPassword')"
              :placeholder="$t('INPUTS.confirmNewPasswordPlaceholder')"
            />

            <div class="flex items-center justify-end gap-3">
              <GlobalsButton
                class="h-[45px] !w-fit !rounded-[10px] border !border-primary bg-transparent px-5 !text-error enabled:hover:bg-error enabled:hover:!text-white lg:h-[50px] lg:max-w-fit lg:text-lg"
                :disabled="updatePasswordLoading"
                :text="$t('BUTTONS.cancel')"
                @click="updatePasswordModal = false"
              />

              <GlobalsButton
                type="submit"
                class="h-[45px] !w-fit !rounded-[10px] bg-primary px-5 text-white lg:h-[50px] lg:max-w-fit lg:text-lg"
                :text="$t('BUTTONS.confirm')"
                :disabled="updatePasswordLoading"
              />
            </div>
          </form>
        </VeeForm>
      </GlobalsModal>
    </Teleport>
    <!-- End of the update password modal -->

    <div
      class="mb-6 rounded-2xl bg-white card-shadow px-6 py-4 dark:bg-box-container-dark"
    >
      <h5 class="mb-3.5 text-xl text-primary font-bold">{{ $t("TITLES.profile") }}</h5>

      <p class="font-light">{{ $t("TEXTS.allYourFilledData") }}</p>
    </div>
    <VeeForm
      v-if="!updateProfileLoading && profileData"
      as="div"
      :validation-schema="schema"
      :initial-values="initialValues"
      @submit="handleUpdateProfile"
    >
      <form class="bg-white card-shadow px-6 dark:bg-box-container-dark py-4 rounded-2xl grid grid-cols-12 gap-5">
        <div
          class="col-span-12 flex flex-col gap-3"
        >
        <div class="flex">
            <div class="relative size-[150px] rounded-full">
              <img
                class="size-full rounded-full object-cover"
                :src="
                  profileData && profileData.image ? profileData.image : '/profile/icons/person.jpg'
                "
                alt="profile-image"
                :draggable="false"
              />

              <label
                for="profileImage"
                class="absolute -bottom-1 -end-1 flex size-[50px] cursor-pointer items-center justify-center rounded-full bg-[#FEF8F9]"
                :class="updateImageLoading && 'cursor-not-allowed opacity-60'"
              >
                <input
                  id="profileImage"
                  type="file"
                  @change="handleChange"
                  class="hidden"
                  accept="image/*"
                  :disabled="updateImageLoading"
                />

                <img src="/globals/icons/edit.svg" :draggable="false" />
              </label>
            </div>
          </div>

          <button
            type="button"
            class="flex items-center gap-3 font-medium text-primary"
            @click="updatePasswordModal = true"
          >
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />

            <span>
              {{ $t("TITLES.changePassword") }}
            </span>
          </button>
        </div>

        <h5 class="col-span-12 mb-3 font-bold">
          {{ $t("TITLES.brokerageInformation") }}
        </h5>

        <InputsBaseInput
          id="mlsID"
          name="mlsID"
          :label="$t('LABELS.mlsID')"
          :placeholder="$t('INPUTS.mlsIDPlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        />

        <InputsBaseInput
          id="fullName"
          name="fullName"
          :label="$t('LABELS.fullName')"
          :placeholder="$t('INPUTS.fullNamePlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        />
<!-- 
        <InputsBaseInput
          id="address"
          type="address"
          name="address"
          :label="$t('LABELS.address')"
          :placeholder="$t('INPUTS.addressPlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        /> -->

        <InputsBaseInput
          id="phoneNumber"
          name="phoneNumber"
          isNumber
          :label="$t('LABELS.phone')"
          :placeholder="$t('INPUTS.phoneNumberPlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        />

        <!-- <InputsBaseInput
          id="faxNumber"
          name="faxNumber"
          isNumber
          :label="$t('LABELS.faxNumber')"
          :placeholder="$t('INPUTS.faxNumberPlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        /> -->

        <InputsBaseInput
          id="email"
          name="email"
          type="email"
          :label="$t('LABELS.email')"
          :placeholder="$t('INPUTS.emailPlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        />

        <InputsValidSelect
          id="status"
          name="status"
          :options="[
            { id: '1', name: 'Active' },
            { id: '0', name: 'In Active' },
          ]"
          :label="$t('LABELS.subscriptionStatus')"
          :placeholder="$t('INPUTS.selectStatus')"
          :dark="$colorMode.value === 'dark'"
          disabled
          class="col-span-12 xl:col-span-6"
          defaultValue="Active"
        />
<!-- 
        <h5 class="col-span-12 my-3 font-bold">
          {{ $t("TITLES.myBrokerage") }}
        </h5> -->
<!-- 
        <InputsBaseInput
          id="officeName"
          name="officeName"
          isNumber
          :label="$t('LABELS.officeName')"
          :placeholder="$t('INPUTS.officeNamePlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        />

        <InputsBaseInput
          id="officeAddress"
          type="address"
          name="officeAddress"
          :label="$t('TITLES.officeAddress')"
          :placeholder="$t('INPUTS.officeAddressPlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        /> -->
<!-- 
        <InputsBaseInput
          id="officePhoneNumber"
          name="directPhoneNumber"
          isNumber
          :label="$t('LABELS.phoneNumber')"
          :placeholder="$t('INPUTS.phoneNumberPlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        /> -->

        <!-- <InputsBaseInput
          id="officeTaxId"
          name="officeTaxId"
          :label="$t('LABELS.officeTaxId')"
          :placeholder="$t('INPUTS.officeTaxIdPlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        />

        <InputsBaseInput
          id="commercialRegistration"
          name="commercialRegistration"
          :label="$t('LABELS.commercialRegistration')"
          :placeholder="$t('INPUTS.officeRegistrationNumberPlaceholder')"
          dark
          disabled
          class="col-span-12 xl:col-span-6"
        /> -->

        <!-- <h5 class="col-span-12 mt-3 font-bold">
          {{ $t("TITLES.marketingCommunicationPreferences") }}
        </h5>

        <div
          class="col-span-12 mb-5 flex select-none flex-col items-start gap-3"
        >
          <label
            class="cursor-not-pointer flex items-center gap-2.5 font-medium"
          >
            <input
              type="checkbox"
              value="email"
              v-model="communicationPreference"
              class="size-[20px]"
            />

            <span>{{ $t("LABELS.emailWithMls") }}</span>
          </label>

          <label
            class="cursor-not-pointer flex items-center gap-2.5 font-medium"
          >
            <input
              type="checkbox"
              value="phone"
              v-model="communicationPreference"
              class="size-[20px]"
            />

            <span>{{ $t("LABELS.contactMeViaPhone") }}</span>
          </label>

          <label
            class="cursor-not-pointer flex items-center gap-2.5 font-medium"
          >
            <input
              type="checkbox"
              value="text"
              v-model="communicationPreference"
              class="size-[20px]"
            />

            <span>{{ $t("LABELS.contactMeViaText") }}</span>
          </label>
        </div> -->

        <!-- <div class="col-span-2 flex items-center justify-end">
          <GlobalsButton
            type="submit"
            :text="$t('BUTTONS.edit')"
            class="!rounded-[28px] bg-primary text-white"
            :disabled="updateProfileLoading"
          />
        </div> -->
      </form>
    </VeeForm>
  </div>
</template>
