<script setup>
import { useToast } from "vue-toastification";
import { configure } from "vee-validate";
import * as yup from "yup";

defineProps({
  titleStyle: {
    type: String,
    required: false,
    default: null,
  },
});

configure({
  validateOnBlur: true,
  validateOnInput: true,
  validateOnChange: true,
  validateOnModelUpdate: true,
});

const i18n = useI18n();

const toast = useToast();

/* Start of the function that handle contact us form */
const schema = yup.object().shape({
  fName: yup.string().required(i18n.t("ERRORS.fNameRequired")),
  lName: yup.string().required(i18n.t("ERRORS.lNameRequired")),
  phone: yup.string().required(i18n.t("ERRORS.phoneNumberRequired")),
  email: yup
    .string()
    .required(i18n.t("ERRORS.emailRequired"))
    .email(i18n.t("ERRORS.invalidEmail")),
  companyName: yup.string().required(i18n.t("ERRORS.companyNameRequired")),
  message: yup.string().required(i18n.t("ERRORS.messageRequired")),
});

const isLoading = ref(false);
async function handleSubmit(values, actions) {
  isLoading.value = true;

  await $fetch()
    .then(() => {
      actions.resetForm();

      toast.success(i18n.t("TEXTS.messageSentSuccessfully"));
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (isLoading.value = false));
}
/* End of the function that handle contact us form */

/* Start of the contact data */
const contactData = {
  email: "info@arabmls.org",
  phone: "+20 122 5444440",
  address: "City Stars, Stars Capital A2, Cairo, Egypt",
  hours: "Mon - Sat: 10am - 4pm",
};
/* End of the contact data */
</script>

<template>
  <section
    id="contact-us"
    class="container relative overflow-hidden pb-7 pt-24"
  >
    <ClientOnly v-if="$colorMode.value === 'light'">
      <img
        src="/sections/contact/bg.svg"
        class="absolute start-2 top-0 z-10 block"
        :class="i18n.locale.value === 'ar' ? 'rotate-180' : ''"
        alt="contact-bg"
      />
    </ClientOnly>

    <div class="relative z-20">
      <div class="mb-10 flex flex-col items-start gap-3 font-medium">
        <h3
          class="wow fadeInUp"
          :class="titleStyle ? titleStyle : 'font-bold md:text-xl xl:text-4xl'"
        >
          {{ $t("TITLES.contactUs") }}
        </h3>

        <p
          class="wow fadeInUp w-full text-sm text-text-dark dark:text-text-light xl:w-[70%]"
        >
          {{ $t("TEXTS.contactUsText") }}
        </p>
      </div>

      <div class="grid grid-cols-12 gap-5">
        <div
          class="wow fadeInUp col-span-12 rounded-[30px] border border-[#EEEEEE] bg-white px-5 py-7 dark:border-[#2F2F37] dark:bg-transparent xl:col-span-9"
        >
          <VeeForm as="div" :validation-schema="schema" @submit="handleSubmit">
            <form>
              <div class="mb-7 grid grid-cols-12 gap-5">
                <div class="col-span-12 xl:col-span-6">
                  <InputsBaseInput
                    id="fName"
                    name="fName"
                    :label="$t('LABELS.fName')"
                    :placeholder="$t('INPUTS.fNamePlaceholder')"
                  />
                </div>

                <div class="col-span-12 xl:col-span-6">
                  <InputsBaseInput
                    id="lName"
                    name="lName"
                    :label="$t('LABELS.lName')"
                    :placeholder="$t('INPUTS.lNamePlaceholder')"
                  />
                </div>

                <div class="col-span-12">
                  <InputsBaseInput
                    id="phoneNumber"
                    name="phone"
                    isNumber
                    :label="$t('LABELS.phoneNumber')"
                    :placeholder="$t('INPUTS.phoneNumberPlaceholder')"
                  />
                </div>

                <div class="col-span-12 xl:col-span-6">
                  <InputsBaseInput
                    id="email"
                    type="email"
                    name="email"
                    :label="$t('LABELS.email')"
                    :placeholder="$t('INPUTS.emailPlaceholder')"
                  />
                </div>

                <div class="col-span-12 xl:col-span-6">
                  <InputsBaseInput
                    id="companyName"
                    name="companyName"
                    isNumber
                    :label="$t('LABELS.companyName')"
                    :placeholder="$t('INPUTS.companyNamePlaceholder')"
                  />
                </div>

                <div class="col-span-12">
                  <InputsBaseTextarea
                    id="message"
                    name="message"
                    :label="$t('LABELS.message')"
                    :placeholder="$t('INPUTS.messagePlaceholder')"
                  />
                </div>
              </div>

              <GlobalsButton
                type="submit"
                :disabled="isLoading"
                :text="$t('BUTTONS.sendYourMessage')"
                class="h-[50px] min-w-[150px] bg-primary px-5 font-medium text-white xl:text-lg"
              />
            </form>
          </VeeForm>
        </div>

        <div class="col-span-12 xl:col-span-3">
          <CardsContactCard
            :title="$t('TITLES.sendAnEmail')"
            :data="contactData.email"
            icon="/icons/email.svg"
            class="mb-6"
            email
          />

          <CardsContactCard
            :title="$t('TITLES.giveUsACall')"
            :data="contactData.phone"
            icon="/icons/phone.svg"
            class="mb-6"
            phone
          />

          <CardsContactCard
            :title="$t('TITLES.officeAddress')"
            :data="contactData.address"
            icon="/icons/location.svg"
            class="mb-6"
          />

          <CardsContactCard
            :title="$t('TITLES.workingHours')"
            :data="contactData.hours"
            icon="/icons/time.svg"
          />
        </div>
      </div>
    </div>
  </section>
</template>
