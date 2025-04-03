<script setup>
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { configure } from "vee-validate";
import VOtpInput from "vue3-otp-input";
import { useAuthStore } from "~/store/auth.js";

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const i18n = useI18n();

useHead({
  title: i18n.t("BUTTONS.login"),
});

definePageMeta({
  layout: "auth",
});

const localePath = useLocalePath();

const route = useRoute();

const router = useRouter();

const toast = useToast();

const authStore = useAuthStore();

const form = ref("login");

const loggedIn = ref(false);

const {
  public: { baseURL },
} = useRuntimeConfig();

const mlsEgyptToken = useCookie("mls_egypt_token", {
  maxAge: 365.25 * 24 * 60 * 60 * 1000,
});

const headers = {
  "Accept-Language": i18n.locales.value.find(
    (item) => item.code === i18n.locale.value,
  )?.iso,
  Lang: i18n.locale.value,
};

/* Start of the function that handle login */
const loginSchema = yup.object().shape({
  email: yup.string().required(i18n.t("ERRORS.emailOrMlsIdRequired")),
  password: yup.string().required(i18n.t("ERRORS.passwordRequired")),
});

const loggedInEmail = ref("");
const loggedInPassword = ref("");

const userPhone = ref(null);

const loginLoading = ref(false);

async function handleEmailConfirmation(email) {
  await $fetch("/account/sendVerificationCode", {
    baseURL,
    headers,
    params: {
      email,
    },
  })
    .then(() => toast.success(i18n.t("TEXTS.codeResentSuccessfully")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (emailConfirmationLoading.value = false));
}

async function handleLogin(values) {
  loginLoading.value = true;

  await $fetch("/account/login", {
    baseURL,
    method: "POST",
    body: {
      user: values.email,
      password: values.password,
    },
    headers,
  })
    .then((res) => {
      loggedInEmail.value = values.email;
      loggedInPassword.value = values.password;

      toast.success(i18n.t("TEXTS.loggedInSuccessfully"));

      loggedIn.value = true;

      userPhone.value = res.data.user.phone;

      forgotEmailOrPhone.value = values.email;

      form.value = "verify-code";
    })
    .catch((e) => {
      console.error(e);
      console.log(e.response);
      if(e.response._data.message.includes('Account Not Verified')){
        toast.error('Please verify your account! An email has been sent to you!' , {timeout : 3000});
        handleEmailConfirmation(values.email)
        return 
      }
      toast.error(e.response._data.message);
    })
    .finally(() => (loginLoading.value = false));
}



/* End of the function that handle login */

/* Start of the function that handle forgot password */
const forgotByEmail = ref(true);

const forgotEmailOrPhone = ref("");

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .test("email", i18n.t("ERRORS.emailRequired"), (value) => {
      if (forgotByEmail.value && !value) {
        return false;
      }

      return true;
    })
    .email(i18n.t("ERRORS.invalidEmail"))
    .notRequired(),
  phone: yup
    .string()
    .test("phone", i18n.t("ERRORS.phoneNumberRequired"), (value) => {
      if (!forgotByEmail.value && !value) {
        return false;
      }

      return true;
    })
    .notRequired(),
});

const forgotPasswordData = ref({});

const forgotPasswordLoading = ref(false);
async function handleForgotPassword(values) {
  forgotPasswordLoading.value = true;

  await $fetch("/account/forgetPassword", {
    baseURL,
    method: "POST",
    body: {
      email: values.email || forgotPasswordData.value.email || "",
      phone: values.phone
        ? values.phone.replace(/^[0.]+/, "") ||
          forgotPasswordData.value.phone.replace(/^[0.]+/, "") ||
          ""
        : "",
      country_code_phone: "+20",
    },
    headers,
  })
    .then(() => {
      forgotPasswordData.value = {
        email: values.email || "",
        phone: values.phone || "",
        country_code_phone: "",
      };

      toast.success(i18n.t("TEXTS.codeSentSuccessfully"));

      if (forgotByEmail.value) {
        forgotEmailOrPhone.value = values.email;
      } else {
        forgotEmailOrPhone.value = values.phone;
      }

      loggedIn.value = false;

      form.value = "email-confirmation";
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (forgotPasswordLoading.value = false));
}
/* End of the function that handle forgot password */

/* Start of the function that handle new password */
const newPasswordSchema = yup.object().shape({
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

const newPasswordLoading = ref(false);
async function handleNewPassword(values) {
  newPasswordLoading.value = true;

  await $fetch("/account/verifyAndChangePassword", {
    method: "POST",
    body: {
      code: route.query.code,
      uid: route.query.uid,
      password: values.password,
    },
    baseURL,
    headers,
  })
    .then(() => {
      toast.success(i18n.t("TEXTS.passwordChangedSuccessfully"));

      form.value = "login";
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (newPasswordLoading.value = false));
}
/* End of the function that handle new password */

/* Start of the function that handle code verification */
const verify_code = ref(null);
function handleOnChange(e) {
  verify_code.value = e;
}

const countDown = ref(60);
const minutes = ref(0);
const seconds = ref(0);
let timer = null;

function counter() {
  countDown.value = 60;
  minutes.value = 0;
  seconds.value = 0;

  if (timer !== null) {
    clearInterval(timer);
  }

  timer = setInterval(() => {
    if (countDown.value >= 0) {
      minutes.value = Math.floor(countDown.value / 60);
      seconds.value = countDown.value % 60;

      countDown.value--;
    } else {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

const temporaryToken = useCookie("mls_egypt_temporary_token");

const verifyCodeLoading = ref(false);
async function handleVerifyCode() {
  if (verify_code.value) {
    if (verify_code.value.length === 5) {
      verifyCodeLoading.value = true;

      let url;

      let body = {};

      if (loggedIn.value) {
        url = "/account/verifyLogIn";

        body = {
          code: verify_code.value,
          user: loggedInEmail.value,
          password: loggedInPassword.value,
        };
      } else {
        url = "/account/verifyAndChangePassword";

        body = {};
      }

      await $fetch(url, {
        baseURL,
        method: "post",
        body,
        headers,
      })
        .then((res) => {
          if (loggedIn.value) {
            authStore.setVerificationData(res.data);
            authStore.setRegistrationData(res.data);
            if(res.data.is_ban){
              toast.error(i18n.t("TEXTS.banned"));
              verifyCodeLoading.value = false;
              form.value = "login";
              return
            }
            if (!res.data.profile_complete) {
              router.push(localePath("/auth/update-application"));
              return
            }
            else if(res.data.profile_complete && !res.data.package_pay){
              authStore.setPendingProfile(res.data)
              router.push(localePath("/auth/pending"));
              return
            } 
            else {
              localStorage.setItem('mls_egypt_token', res.data.token);
              localStorage.setItem(
                "profileData",
                JSON.stringify(res.data),
              );
              router.push(localePath("/profile"));
            }
          } else {
            form.value = "login";
            verifyCodeLoading.value = false;
          }

          toast.success(i18n.t("TEXTS.codeVerifiedSuccessfully"));
        })
        .catch((e) => {
          console.log(e);

          verifyCodeLoading.value = false;

          toast.error(Object.values(e.response._data.errors)[0]);
        });
    } else {
      toast.error(i18n.t("ERRORS.enterFullCode"));
    }
  } else {
    toast.error(i18n.t("ERRORS.codeRequired"));
  }
}
/* End of the function that handle code verification */

/* Start of the function that handle resend code */
const resendCodeLoading = ref(false);
async function handleResendCode() {
  resendCodeLoading.value = true;

  let url = "";

  let body = {};

  if (loggedIn.value) {
    url = "/account/sendLogInCode";

    body = {
      email: loggedInEmail.value,
      password: loggedInPassword.value,
    };
  } else {
  }

  await $fetch(url, {
    baseURL,
    method: "POST",
    body,
    headers,
  })
    .then(() => {
      toast.success(i18n.t("TEXTS.codeResentSuccessfully"));

      counter();
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (resendCodeLoading.value = false));
}
/* End of the function that handle resend code */

/* Change language modal */
const changeLanguage = ref(false);
/* End of the change language modal */

watch(form, (value) => {
  if (value === "verify-code") {
    verify_code.value = null;

    counter();
  }
});

const confirmVerification = async () => {
  await $fetch("account/verify", {
    baseURL,
    method: "GET",
    params: {
      uid: route.query.uid,
      code: route.query.code,
    },
    headers,
  })
    .then(() => toast.success(i18n.t("TEXTS.codeVerifiedSuccessfully")))
    .catch((e) => {
      console.log(e);
      verifyCodeLoading.value = false;
      toast.error(e.response._data.message);
    });
};
watch(
  () => route.query,
  (value) => {
    if (value.uid && value.code) {
      if (value.forget_password == 1) {
        form.value = "new-password";
      } else {
        confirmVerification();
      }
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
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
    class="relative max-h-[95vh] w-full overflow-y-auto overflow-x-hidden rounded-[24px] border border-white bg-white p-3 dark:border-[#1C1C21] dark:bg-[#0B0909] md:p-7 lg:w-[700px]"
  >
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
            <template v-if="form === 'login'">
              {{ $t("TITLES.loginTitle") }}
            </template>

            <template v-else-if="form === 'forgot-password'">
              <div class="flex items-center gap-2">
                <img @click="form= 'login'" src="/profile/icons/arrow-left.svg" class="w-[25px] cursor-pointer" alt="">
                {{ $t("TITLES.forgotPasswordTitle") }}
              </div>
            </template>

            <template v-else-if="form === 'verify-code'">
              {{ $t("TITLES.verificationCode") }}
            </template>

            <template v-else-if="form === 'new-password'">
              {{ $t("TITLES.changePassword") }}
            </template>
          </h5>

          <p class="text-text-dark dark:text-text-light">

            <template v-if="form === 'login'">
              {{ $t("TEXTS.loginText") }}
            </template>

            <template v-else-if="form === 'forgot-password'">
              {{ $t("TEXTS.forgotPasswordText") }}
            </template>

            <template v-else-if="form === 'verify-code'">
              <div class="flex flex-wrap gap-1">
                <span>{{ $t("TEXTS.enterCodeWeSentToYourPhone") }}</span>
                <span class="font-bold text-black dark:text-white"
                  >*******{{ userPhone.toString().slice(-4) }}</span
                >
                <span>{{ $t("TEXTS.andRegisteredPhone") }}</span>
              </div>
            </template>

            <template v-else-if="form === 'new-password'">
              {{ $t("TEXTS.changePasswordText") }}
            </template>
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

      <!-- Login form -->
      <VeeForm
        v-if="form === 'login'"
        as="div"
        :validation-schema="loginSchema"
        @submit="handleLogin"
      >
        <form>
          <InputsBaseInput
            id="email"
            name="email"
            :label="$t('LABELS.emailOrMlsId')"
            :placeholder="$t('INPUTS.emailOrMlsIdPlaceholder')"
          />

          <div class="my-5">
            <InputsBaseInput
              id="password"
              name="password"
              type="password"
              :label="$t('LABELS.password')"
              :placeholder="$t('INPUTS.passwordPlaceholder')"
            />

            <div class="mt-2 flex items-center justify-end">
              <button
                type="button"
                class="font-medium disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="loginLoading"
                @click="form = 'forgot-password'"
              >
                {{ $t("BUTTONS.forgotPassword") }}
              </button>
            </div>
          </div>

          <GlobalsButton
            type="submit"
            :text="$t('BUTTONS.signIn')"
            class="w-full bg-primary font-medium text-white"
            :disabled="loginLoading"
          />

          <div
            class="mt-2 flex flex-col items-center justify-center gap-2 font-medium"
          >
            <span>{{ $t("TEXTS.firstTimeHere") }}</span>

            <div class="flex flex-col items-center gap-3 md:gap-5 xl:flex-row">
              <NuxtLink :to="localePath('/auth/register')" class="text-primary">
                {{ $t("BUTTONS.registerAgent") }}
              </NuxtLink>

              <span
                class="hidden h-[25px] w-[2px] bg-text-light dark:bg-text-dark md:inline-block"
              />

              <span class="text-text-light dark:text-text-dark">{{
                i18n.locale.value === "ar" ? "أو" : "OR"
              }}</span>

              <a
                href="https://corporate.arabmls.org/login"
                class="text-primary"
                target="_blank"
              >
                {{ $t("BUTTONS.registerCompany") }}
              </a>
            </div>
          </div>
        </form>
      </VeeForm>
      <!-- End of the login form -->

      <!-- Forgot password form -->
      <VeeForm
        v-else-if="form === 'forgot-password'"
        as="div"
        :validation-schema="forgotPasswordSchema"
        @submit="handleForgotPassword"
      >
        <form>
          <div class="mb-7 flex w-fit items-center text-lg font-medium">
            <button
              type="button"
              class="border-b-2 pb-3 pe-7 duration-200"
              :class="
                forgotByEmail
                  ? 'border-error text-primary'
                  : 'border-text-[#9FA7A8]'
              "
              @click="forgotByEmail = true"
            >
              {{ $t("LABELS.email") }}
            </button>

            <button
              type="button"
              class="border-b-2 px-7 pb-3 duration-200"
              :class="
                forgotByEmail
                  ? 'border-text-[#9FA7A8]'
                  : 'border-error text-primary'
              "
              @click="forgotByEmail = false"
            >
              {{ $t("LABELS.phone") }}
            </button>
          </div>

          <div class="mb-5">
            <InputsBaseInput
              v-if="forgotByEmail"
              id="email"
              name="email"
              type="email"
              :label="$t('LABELS.email')"
              :placeholder="$t('INPUTS.emailPlaceholder')"
            />

            <InputsBaseInput
              v-else
              id="phoneNumber"
              name="phone"
              isNumber
              :label="$t('LABELS.phoneNumber')"
              :placeholder="$t('INPUTS.phoneNumberPlaceholder')"
            />
          </div>

          <GlobalsButton
            type="submit"
            :text="$t('BUTTONS.send')"
            class="w-full bg-primary font-medium text-white"
            :disabled="forgotPasswordLoading"
          />

          <div class="mt-2 flex items-center justify-center gap-2 font-medium">
            <span>{{ $t("TEXTS.firstTimeHere") }}</span>

            <NuxtLink
              :to="localePath('/auth/register')"
              class="text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ $t("BUTTONS.registerNow") }}
            </NuxtLink>
          </div>
        </form>
      </VeeForm>
      <!-- End of the forgot password form -->

      <!-- New password form -->
      <VeeForm
        v-else-if="form === 'new-password'"
        as="div"
        :validation-schema="newPasswordSchema"
        @submit="handleNewPassword"
      >
        <form>
          <div class="mb-5">
            <InputsBaseInput
              id="password"
              name="password"
              type="password"
              :label="$t('LABELS.password')"
              :placeholder="$t('INPUTS.newPasswordPlaceholder')"
            />
          </div>

          <InputsBaseInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            :label="$t('LABELS.confirmPassword')"
            :placeholder="$t('INPUTS.passwordPlaceholder')"
          />

          <GlobalsButton
            type="submit"
            :text="$t('BUTTONS.send')"
            class="mt-7 w-full bg-primary font-medium text-white"
            :disabled="newPasswordLoading"
          />
        </form>
      </VeeForm>
      <!-- End of the new password form -->

      <!-- Email confirmation -->
      <template v-else-if="form === 'email-confirmation'">
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
              :disabled="forgotPasswordLoading"
              @click="handleForgotPassword"
            >
              {{ $t("BUTTONS.resendConfirmationEmail") }}
            </button>
          </div>
        </div>
      </template>
      <!-- End of the email confirmation -->

      <!-- Start of the verify code form -->
      <div v-else-if="form === 'verify-code'">
        <!-- <div class="flex items-center justify-start gap-3">
          <button
            type="button"
            class="text-lg font-medium text-primary disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="verifyCodeLoading"
            @click="
              () => {
                if (form === 'verify-code') {
                  form = 'login';
                } else {
                  form = 'forgot-password';
                }
              }
            "
          >
            {{ $t("BUTTONS.changeEmailAddress") }}
          </button>
        </div> -->

        <v-otp-input
          input-classes="rounded-md xl:text-2xl text-center size-[50px] md:size-[65px] bg-[#F8F9F9] border border-[#E7E9E9] dark:bg-[#0D0D0D] dark:border-[#262626]"
          class="my-3.5 flex items-center gap-7"
          separator=" "
          v-model="verify_code"
          value=""
          :num-inputs="5"
          :should-auto-focus="true"
          @on-change="handleOnChange"
          dir="ltr"
        />

        <div class="mb-7 flex items-center justify-between">
          <div class="flex items-center gap-1 font-medium">
            <span>{{ $t("TEXTS.didNotReceiveCode") }}</span>

            <button
              type="button"
              class="text-primary disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="countDown > 0 || resendCodeLoading"
              @click="handleResendCode"
              :aria-label="$t('BUTTONS.resend')"
            >
              {{ $t("BUTTONS.resend") }}
            </button>
          </div>

          <span class="text-title text-sm font-semibold"
            >{{ `0${minutes}` }}:{{
              seconds < 10
                ? `${seconds < 10 ? `0${seconds}` : seconds}`
                : seconds
            }}</span
          >
        </div>

        <GlobalsButton
          type="button"
          :text="$t('BUTTONS.signIn')"
          class="w-full bg-primary font-medium text-white"
          :disabled="verifyCodeLoading"
          @handleClick="handleVerifyCode"
        />

        <div class="mt-2 flex items-center justify-center gap-2 font-medium">
          <button type="button" class="text-primary" @click="form = 'login'">
            {{ $t("BUTTONS.backToLogin") }}
          </button>
        </div>
      </div>
      <!-- End of the verify code form -->
    </div>
  </div>
</template>
