<script setup>
import Vue3Signature from "vue3-signature";
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { configure } from "vee-validate";

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const i18n = useI18n();

useHead({
  title: i18n.t("BUTTONS.register"),
});

definePageMeta({
  layout: "auth",
});

const toast = useToast();

const localePath = useLocalePath();

const form = ref("register");

const {
  public: { baseURL },
} = useRuntimeConfig();

const headers = {
  "Accept-Language": i18n.locales.value.find(
    (item) => item.code === i18n.locale.value,
  )?.iso,
  Lang: i18n.locale.value,
};

/* Start of the register form */
const roleOptions = ref([
  {
    id: "developer",
    name: i18n.t("INPUTS.developer"),
  },
  {
    id: "broker",
    name: i18n.t("INPUTS.broker"),
  },
]);

const registerSchema = yup.object().shape({
  name: yup.string().required(i18n.t("ERRORS.nameRequired")),
  email: yup
    .string()
    .required(i18n.t("ERRORS.emailRequired"))
    .email(i18n.t("ERRORS.invalidEmail")),
  phone: yup.string().required(i18n.t("ERRORS.phoneNumberRequired")),
  secondPhone: yup.string().required(i18n.t("ERRORS.phoneNumberRequired")),
  role: yup.string().required(i18n.t("ERRORS.roleRequired")),
  password: yup.string().required(i18n.t("ERRORS.passwordRequired")),
  confirmPassword: yup
    .string()
    .when("password", (password, field) =>
      password
        ? field
            .required(i18n.t("ERRORS.passwordRequired"))
            .oneOf([yup.ref("password")], i18n.t("ERRORS.passwordsNotMatch"))
        : field,
    ),
});

const registeredEmail = ref("");

const registerLoading = ref(false);
async function handleRegister(values) {
  registerLoading.value = true;

  await $fetch("/account/register", {
    baseURL,
    method: "POST",
    headers,
    body: {
      name: values.name,
      email: values.email,
      country_code_phone: "+20",
      phone: values.phone.replace(/^[0.]+/, ""),
      second_phone: values.secondPhone.replace(/^[0.]+/, ""),
      password: values.password,
      type: values.role,
    },
  })
    .then(() => {
      toast.success(i18n.t("TEXTS.registeredSuccessfully"));

      form.value = "email-confirmation";

      registeredEmail.value = values.email;
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (registerLoading.value = false));
}
/* End of the register form */

/* Start of the email confirmation */
const emailConfirmationLoading = ref(false);
async function handleEmailConfirmation() {
  emailConfirmationLoading.value = true;

  await $fetch("/account/sendVerificationCode", {
    baseURL,
    headers,
    params: {
      email: registeredEmail.value,
    },
  })
    .then(() => toast.success(i18n.t("TEXTS.codeResentSuccessfully")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (emailConfirmationLoading.value = false));
}
/* End of the email confirmation */
const changeLanguage = ref(false);
</script>

<template>
  <!-- Change language modal -->
  <Teleport to="body">
    <GlobalsConfirmModal
      v-if="changeLanguage"
      :title="$t('TITLES.changeLanguage')"
      :text="$t('TEXTS.changeLanguageText')"
      :btnText="$t('BUTTONS.change')"
      @handleClick="
        () => {
          i18n.setLocale(i18n.locale.value === 'ar' ? 'en' : 'ar');
          changeLanguage = false;
        }
      "
      @close="changeLanguage = false"
    />
  </Teleport>
  <!-- End of the change language modal -->

  <div
    v-if="form === 'register' || form === 'email-confirmation'"
    class="relative max-h-[95vh] w-full overflow-y-auto overflow-x-hidden rounded-[24px] border border-transparent bg-white p-3 dark:border-[#1C1C21] dark:bg-[#0B0909] md:p-7 lg:w-[700px]"
  >
    <template v-if="form === 'register'">
      <ClientOnly>
        <div class="absolute end-0 top-0 z-10">
          <img
            v-if="$colorMode.value === 'light'"
            src="/globals/modal/light-top-image.svg"
            alt="light-modal-image"
            :draggable="false"
          />

          <img
            v-else
            src="/globals/modal/dark-top-image.svg"
            alt="dark-modal-image"
            :draggable="false"
          />
        </div>
      </ClientOnly>

      <div class="relative z-20">
        <div
          class="mb-7 flex flex-col items-start justify-between gap-3 lg:flex-row lg:items-center"
        >
          <div class="flex flex-col items-start">
            <ClientOnly>
              <img
                v-if="$colorMode.value === 'dark'"
                src="/public/logo/egypt-mls-dark.svg"
                class="h-[70px]"
                alt="light-logo"
                :draggable="false"
              />

              <img
                v-else
                src="/public/logo/egypt-mls-light.svg"
                class="h-[70px]"
                alt="light-logo"
                :draggable="false"
              />
            </ClientOnly>

            <h5 class="mb-2 mt-5 text-lg font-medium">
              {{
                form === "register"
                  ? $t("TITLES.interestedInJoining")
                  : $t("TITLES.")
              }}
            </h5>

            <p class="text-text-dark dark:text-text-light">
              {{
                form === "register" ? $t("TEXTS.enterDataText") : $("TEXTS.")
              }}
            </p>
          </div>

          <div
            class="flex min-w-[200px] items-center justify-start gap-2 lg:justify-end"
          >
            <NavigationSwitchMode />

            <button
              type="button"
              class="font-medium"
              @click="changeLanguage = true"
            >
              {{ $i18n.locale === "ar" ? "En" : "عربي" }}
            </button>
          </div>
        </div>

        <VeeForm
          as="div"
          :validation-schema="registerSchema"
          @submit="handleRegister"
        >
          <form class="grid grid-cols-12 gap-5">
            <div class="col-span-12 xl:col-span-6">
              <InputsBaseInput
                id="name"
                name="name"
                :label="$t('LABELS.name')"
                :placeholder="$t('INPUTS.namePlaceholder')"
                isChar
              />
            </div>

            <div class="col-span-12 xl:col-span-6">
              <InputsBaseInput
                id="email"
                name="email"
                :label="$t('LABELS.email')"
                :placeholder="$t('INPUTS.emailPlaceholder')"
              />
            </div>

            <div class="col-span-12 xl:col-span-6">
              <InputsBaseInput
                id="phoneNumber"
                name="phone"
                isNumber
                :label="$t('LABELS.phone')"
                :placeholder="$t('INPUTS.phoneNumberPlaceholder')"
              />
            </div>

            <div class="col-span-12 xl:col-span-6">
              <InputsBaseInput
                id="secondPhoneNumber"
                name="secondPhone"
                isNumber
                :label="$t('LABELS.secondPhone')"
                :placeholder="$t('INPUTS.secondPhonePlaceholder')"
              />
            </div>

            <div class="col-span-12">
              <InputsValidSelect
                id="role"
                name="role"
                :options="roleOptions"
                :label="$t('LABELS.role')"
                :placeholder="$t('INPUTS.selectRole')"
              />
            </div>

            <div class="col-span-12">
              <InputsBaseInput
                id="password"
                name="password"
                type="password"
                :label="$t('LABELS.password')"
                :placeholder="$t('INPUTS.passwordPlaceholder')"
              />
            </div>

            <div class="col-span-12">
              <InputsBaseInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                :label="$t('LABELS.confirmPassword')"
                :placeholder="$t('INPUTS.passwordPlaceholder')"
              />
            </div>

            <div class="col-span-12">
              <GlobalsButton
                type="submit"
                :text="$t('BUTTONS.signUp')"
                class="w-full bg-primary font-medium text-white"
                :disabled="registerLoading"
              />
            </div>

            <div
              class="col-span-12 flex items-center justify-center gap-2 font-medium"
            >
              <span>{{ $t("TEXTS.alreadyHaveAnAccount") }}</span>

              <NuxtLink :to="localePath('/auth/login')" class="text-primary">
                {{ $t("BUTTONS.login") }}
              </NuxtLink>
            </div>
          </form>
        </VeeForm>
      </div>
    </template>

    <template v-if="form === 'email-confirmation'">
      <div class="flex flex-col items-center justify-center gap-5">
        <img
          src="/globals/modal/email-confirmation.svg"
          class="size-[90px]"
          alt="email-confirmation-image"
          :draggable="false"
        />

        <h5 class="text-xl font-medium">
          {{ $t("TITLES.emailConfirmation") }}
        </h5>

        <p
          class="border-b border-inputBg-dark pb-5 text-center text-text-dark dark:text-text-light"
        >
          {{ $t("TEXTS.emailConfirmationText") }}
        </p>

        <div class="flex items-center justify-center gap-2">
          <span>{{ $t("TEXTS.notGotEmail") }}</span>

          <button
            type="button"
            class="font-medium text-primary disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="emailConfirmationLoading"
            @click="handleEmailConfirmation"
          >
            {{ $t("BUTTONS.resendConfirmationEmail") }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
