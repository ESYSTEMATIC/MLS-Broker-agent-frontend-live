<template>
  <Teleport to="body">
    <GlobalsModal v-if="paymentModal" special hideClose>
      <div class="flex flex-col items-center justify-center gap-3">
        <img src="/icons/waiting.svg" alt="waiting" :draggable="false" />

        <p
          class="text-title-light dark:text-title-dark xl:text-lg xl:font-medium"
        >
          {{ $t("TEXTS.waitingForPayment") }}
        </p>
      </div>
    </GlobalsModal>
  </Teleport>

  <div
    class="relative max-h-[95vh] w-full overflow-y-auto overflow-x-hidden rounded-[24px] border border-transparent bg-white p-3 dark:border-[#1C1C21] dark:bg-[#0B0909] md:p-7 lg:w-[1200px]"
  >
    <div class="mb-5 grid w-full grid-cols-12 items-center font-medium xl:mb-7">
      <button
        type="button"
        class="col-span-12 flex items-center gap-2 pb-5 pe-7 duration-200 lg:col-span-3 xl:border-b-2 xl:pb-3"
        :class="step === 1 ? 'border-primary' : 'border-text-[#9FA7A8]'"
        @click="step = 1"
        disabled
      >
        <span
          class="flex size-[24px] items-center justify-center rounded-full text-sm text-white dark:text-inherit"
          :class="step === 1 ? 'bg-primary text-white' : 'bg-[#9FA7A8]'"
          >1</span
        >

        <span :class="step === 1 ? 'text-primary' : 'text-[#9FA7A8]'">
          {{ $t("TITLES.companyInformation") }}
        </span>
      </button>

      <button
        type="button"
        class="col-span-12 flex items-center gap-2 pb-5 pe-7 duration-200 lg:col-span-3 xl:justify-center xl:border-b-2 xl:pb-3"
        :class="step === 2 ? 'border-primary' : 'border-text-[#9FA7A8]'"
        @click="step = 2"
        disabled
      >
        <span
          class="flex size-[24px] items-center justify-center rounded-full text-sm text-white dark:text-inherit"
          :class="step === 2 ? 'bg-primary text-white' : 'bg-[#9FA7A8]'"
          >2</span
        >

        <span :class="step === 2 ? 'text-primary' : 'text-[#9FA7A8]'">
          {{ $t("TITLES.agentInformation") }}
        </span>
      </button>

      <button
        type="button"
        class="col-span-12 flex items-center gap-2 pb-5 pe-7 duration-200 lg:col-span-3 xl:justify-center xl:border-b-2 xl:pb-3"
        :class="step === 3 ? 'border-primary' : 'border-text-[#9FA7A8]'"
        @click="step = 3"
        disabled
      >
        <span
          class="flex size-[24px] items-center justify-center rounded-full text-sm text-white dark:text-inherit"
          :class="step === 3 ? 'bg-primary text-white' : 'bg-[#9FA7A8]'"
          >3</span
        >

        <span :class="step === 3 ? 'text-primary' : 'text-[#9FA7A8]'">
          {{ $t("TITLES.uploadDocuments") }}
        </span>
      </button>

      <button
        type="button"
        class="col-span-12 flex items-center gap-2 pb-5 pe-7 duration-200 lg:col-span-3 xl:justify-center xl:border-b-2 xl:pb-3"
        :class="step === 4 ? 'border-primary' : 'border-text-[#9FA7A8]'"
        @click="step = 4"
        disabled
      >
        <span
          class="flex size-[24px] items-center justify-center rounded-full text-sm text-white dark:text-inherit"
          :class="step === 4 ? 'bg-primary text-white' : 'bg-[#9FA7A8]'"
          >4</span
        >

        <span :class="step === 4 ? 'text-primary' : 'text-[#9FA7A8]'">
          {{ $t("TITLES.signature") }}
        </span>
      </button>
    </div>

    <template v-if="loadingAllData">
      <VeeForm
        v-if="step === 1"
        as="div"
        :validation-schema="brokerageSchema"
        @submit="handleBrokerageInfo"
        :initialValues="brokerageInitialValues"
      >
        <form class="grid grid-cols-12 gap-5">
          <div class="col-span-12 xl:col-span-6">
            <!-- {{companiesOptions}} -->
            <InputsValidAutoComplete
              id="company"
              name="company"
              :options="companiesOptions"
              :label="`${$t('GLOBALS.company')} *`"
              :placeholder="$t('INPUTS.companyPlaceholder')"
              @select="
                (e) => {
                  if (e) {
                    currentCompany = e.id;

                    getCompanyBranches(e.id);
                  } else {
                    branchesOptions = [];
                  }
                }
              "
              @input="resetBranch = true"
            />
          </div>

          <div class="col-span-12 xl:col-span-6">
            <InputsValidSelect
              id="branch"
              name="branch"
              :options="branchesOptions"
              :label="`${$t('LABELS.branch')} *`"
              :placeholder="$t('INPUTS.branchPlaceholder')"
              :reset="resetBranch"
              @select="currentBranch = $event"
            />
          </div>

          <div class="col-span-12">
            <GlobalsButton
              type="submit"
              :text="$t('BUTTONS.next')"
              class="w-fit bg-primary font-medium text-white"
              :disabled="brokerageLoading"
            />
          </div>
        </form>
      </VeeForm>
      <!-- End of the brokerage information -->

      <!-- Principles broker information -->
      <VeeForm
        v-else-if="step === 2"
        as="div"
        :validation-schema="principlesBrokerSchema"
        @submit="handlePrinciplesBroker"
        :initialValues="principlesInitialValues"
      >
        <form class="grid grid-cols-12 gap-5">
          <!-- <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="fName"
              name="fName"
              :label="$t('LABELS.fName')"
              :placeholder="$t('INPUTS.fNamePlaceholder')"
              isChar disabled :value="formPopulateData.name"
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="middleName"
              name="middleName"
              :label="$t('LABELS.middleName')"
              :placeholder="$t('INPUTS.middleNamePlaceholder')"
              isChar
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="lName"
              name="lName"
              :label="$t('LABELS.lName')"
              :placeholder="$t('INPUTS.lNamePlaceholder')"
              isChar
            />
          </div> -->

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsValidDate
              id="birthDate"
              name="birthDate"
              :label="$t('LABELS.birthDate')"
              :placeholder="$t('INPUTS.selectDateOfBirth')"
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsValidSelect
              id="nationality"
              name="nationality"
              :options="[
                { id: 'egypt', name: 'Egyptian' },
                { id: 'ksa', name: 'Saudi Arabia' },
                { id: 'qatar', name: 'Qatar' },
                { id: 'kuwait', name: 'Kuwait' },
                { id: 'bahrain', name: 'Bahrain' },
                { id: 'uae', name: 'UAE' },
              ]"
              :label="$t('LABELS.nationality')"
              :placeholder="$t('INPUTS.selectNationality')"
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsValidSelect
              id="gender"
              name="gender"
              :options="[
                { id: 'male', name: 'Male' },
                { id: 'female', name: 'Female' },
              ]"
              :label="$t('LABELS.gender')"
              :placeholder="$t('INPUTS.selectGender')"
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="nationalId"
              name="nationalId"
              isNumber
              :label="$t('LABELS.governmentNationalId')"
              :placeholder="$t('INPUTS.governmentNationalIdPlaceholder')"
            />
          </div>

          <!-- <div class="col-span-12 md:col-span-6 xl:col-span-4">
          <InputsBaseInput
            id="phoneNumber"
            name="phone"
            isNumber
            :label="$t('LABELS.phoneNumber')"
            :placeholder="$t('INPUTS.phoneNumberPlaceholder')"
          />
        </div> -->
          <div class="col-span-12 md:col-span- xl:col-span-8">
            <InputsBasePhoneInput
              name="direct_phone_number"
              :label="$t('LABELS.phoneNumber')"
              placeholder="123 456 789"
              :value="initialValues.direct_phone_number"
              isNumber
            />
          </div>
<!-- 
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="second_email"
              name="second_email"
              :label="$t('LABELS.email')"
              :placeholder="$t('INPUTS.emailPlaceholder')"
            />
          </div> -->

          <div class="col-span-12 md:col-span-6">
            <label
              for="preferredWayCommunication"
              class="mb-2 block font-medium"
              >{{ $t("LABELS.preferredWayCommunication") }}</label
            >

            <div class="flex select-none items-center gap-5 font-medium">
              <label
                for="communicationEmail"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="communicationEmail"
                  value="email"
                  class="size-[20px] cursor-pointer"
                  v-model="communicationWay"
                />

                <span>{{ $t("INPUTS.email") }}</span>
              </label>

              <label
                for="communicationPhone"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="communicationPhone"
                  value="phoneCall"
                  class="size-[20px] cursor-pointer"
                  v-model="communicationWay"
                />

                <span>{{ $t("INPUTS.phoneCall") }}</span>
              </label>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <label for="realEstateSpecialty" class="mb-2 block font-medium">{{
              $t("LABELS.realEstateSpecialty")
            }}</label>

            <div class="flex select-none items-center gap-5 font-medium">
              <label
                for="realEstateSpecialty"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="realEstateSpecialty"
                  value="residential"
                  class="size-[20px] cursor-pointer"
                  v-model="realEstate"
                />

                <span>{{ $t("INPUTS.residential") }}</span>
              </label>

              <label
                for="realEstateEmail"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="realEstateEmail"
                  value="Commercial"
                  class="size-[20px] cursor-pointer"
                  v-model="realEstate"
                />

                <span>{{ $t("INPUTS.commercial") }}</span>
              </label>

              <label
                for="BothRealEstate"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="BothRealEstate"
                  value="both"
                  class="size-[20px] cursor-pointer"
                  v-model="realEstate"
                />

                <span>{{ $t("INPUTS.both") }}</span>
              </label>
            </div>
          </div>

          <!-- <div class="col-span-12 md:col-span-7">
            <label for="ensureOfficeAddress" class="mb-2 block font-medium">{{
              $t("LABELS.ensureOfficeAddress")
            }}</label>

            <div class="flex select-none items-center gap-5 font-medium">
              <label
                for="officeAddressYes"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="officeAddressYes"
                  value="yes"
                  class="size-[20px] cursor-pointer"
                  v-model="officeAddress"
                />

                <span>{{ $t("INPUTS.yes") }}</span>
              </label>

              <label
                for="officeAddressNo"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="officeAddressNo"
                  value="no"
                  class="size-[20px] cursor-pointer"
                  v-model="officeAddress"
                />

                <span>{{ $t("INPUTS.no") }}</span>
              </label>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <InputsBaseInput
              id="ifNotWhere"
              name="ifNotWhere"
              :label="$t('LABELS.ifNotWhere')"
              :placeholder="$t('LABELS.ifNotWhere')"
            />
          </div> -->

          <div class="col-span-12 md:col-span-6">
            <InputsBaseInput
              id="license"
              name="license"
              isNumber
              :label="$t('LABELS.realEstateLicense')"
              :placeholder="$t('INPUTS.realEstateLicensePlaceholder')"
            />
          </div>

          <div
            class="col-span-12 flex items-center gap-3 font-medium text-white"
            :class="
              $colorMode.value === 'light' ? 'justify-end' : 'justify-start'
            "
          >
            <GlobalsButton
              v-if="checkRegisterStep !== 2"
              type="button"
              :text="$t('BUTTONS.back')"
              class="w-fit border border-[#CE11271A] bg-[#141313] px-5 duration-300 hover:bg-primary"
              :disabled="brokerageLoading"
              @handleClick="step = 1"
            />

            <GlobalsButton
              type="submit"
              :text="$t('BUTTONS.next')"
              class="w-fit bg-primary"
              :disabled="brokerageLoading"
            />
          </div>
        </form>
      </VeeForm>
      <!-- End of the principles information -->

      <!-- Document -->
      <VeeForm
        v-else-if="step === 3"
        as="div"
        :validation-schema="documentsSchema"
        @submit="handleDocument"
        :initialValues="documentInitialValues"
      >
        <form class="grid grid-cols-12 gap-5">
          <h5 class="col-span-12 text-lg font-medium">
            {{ $t("LABELS.nationalId") }}
          </h5>

          <div class="col-span-12 xl:col-span-6">
            <InputsFileInput
              id="nationalFrontId"
              name="nationalFrontId"
              :label="$t('LABELS.frontId')"
              :placeholder="$t('INPUTS.uploadImage')"
              type="image/*"
            />
          </div>

          <div class="col-span-12 xl:col-span-6">
            <InputsFileInput
              id="nationalBackId"
              name="nationalBackId"
              :label="$t('LABELS.backId')"
              :placeholder="$t('INPUTS.uploadImage')"
              type="image/*"
            />
          </div>

          <!-- <h5 class="col-span-12 text-lg font-medium">
            {{ $t("LABELS.taxId") }}
          </h5>

          <div class="col-span-12 xl:col-span-6">
            <InputsFileInput
              id="taxFrontId"
              name="taxFrontId"
              :label="$t('LABELS.frontId')"
              :placeholder="$t('INPUTS.uploadImage')"
              type="image/*"
            />
          </div>

          <div class="col-span-12 xl:col-span-6">
            <InputsFileInput
              id="taxBackId"
              name="taxBackId"
              :label="$t('LABELS.backId')"
              :placeholder="$t('INPUTS.uploadImage')"
              type="image/*"
            />
          </div>

          <h5 class="col-span-12 text-lg font-medium">
            {{ $t("LABELS.commercialRegistration") }}
          </h5>

          <div class="col-span-12 xl:col-span-6">
            <InputsFileInput
              id="commercialRegistrationFrontId"
              name="commercialRegistrationFrontId"
              :label="$t('LABELS.frontId')"
              :placeholder="$t('INPUTS.uploadImage')"
              type="image/*"
            />
          </div>

          <div class="col-span-12 xl:col-span-6">
            <InputsFileInput
              id="commercialRegistrationBackId"
              name="commercialRegistrationBackId"
              :label="$t('LABELS.backId')"
              :placeholder="$t('INPUTS.uploadImage')"
              type="image/*"
            />
          </div> -->

          <div
            class="col-span-12 flex items-center gap-3 font-medium text-white"
            :class="
              $colorMode.value === 'light' ? 'justify-end' : 'justify-start'
            "
          >
            <GlobalsButton
              type="button"
              :text="$t('BUTTONS.back')"
              class="w-fit border border-[#CE11271A] bg-[#141313] px-5 duration-300 hover:bg-primary"
              :disabled="documentLoading"
              @handleClick="step = 2"
            />

            <GlobalsButton
              type="submit"
              :text="$t('BUTTONS.next')"
              class="w-fit bg-primary"
              :disabled="documentLoading"
            />
          </div>
        </form>
      </VeeForm>
      <!-- End of the document -->

      <!-- Signature -->
      <div v-if="step === 4">
        <h5 class="col-span-12 mb-2.5 uppercase xl:text-lg">
          {{ $t("TITLES.termsConditions") }}
        </h5>

        <div class="mb-5 rounded-lg border border-inputBg-dark p-3.5">
          <div class="max-h-[200px] overflow-auto">
            <pre>
              <h3>All services and dealings specialized for platform <a href="http://www.arabmls.org">www.arabmls.org</a> are subject to the following conditions and terms:</h3>
              
              <ol>
                <li>
                  <strong>Presented and Submitted Services and Information:</strong>
                  <ul>
                    <li>All services and information presented on this site are subject to the usage terms policy.</li>
                    <li>
                      Information provided is for general purposes only and should not be relied on as a substitute for professional counseling.
                    </li>
                  </ul>
                </li>
                
                <li>
                  <strong>Protection of Personal Information:</strong>
                  <ul>
                    <li>
                      Refer to the <a href="http://www.arabmls.org">privacy policy</a> for details on the collection and usage of personal information.
                    </li>
                  </ul>
                </li>
                
                <li>
                  <strong>Usage of Password to Access Some Services:</strong>
                  <ul>
                    <li>If issued a password or secure access, you are responsible for its confidentiality.</li>
                    <li>
                      Unauthorized access or use of the site through your credentials is solely your responsibility.
                    </li>
                    <li>All submitted documents must be valid, with no liability on the platform for inaccuracies.</li>
                  </ul>
                </li>
                
                <li>
                  <strong>Usage of the Platform/Site by Kids:</strong>
                  <ul>
                    <li>This platform is not intended for use by individuals under 18 years old.</li>
                    <li>Please review the <a href="http://www.arabmls.org">privacy policy</a>.</li>
                  </ul>
                </li>
                
                <li>
                  <strong>Content of the Platform/Site:</strong>
                  <ul>
                    <li>All materials, including text, images, and trademarks, are the exclusive intellectual property of the platform.</li>
                    <li>
                      Materials may not be copied, reproduced, distributed, or exploited without prior written consent from the platform.
                    </li>
                  </ul>
                </li>
                
                <li>
                  <strong>Links to Other Sites:</strong>
                  <ul>
                    <li>
                      The platform may contain links to external sites but is not responsible for their content or privacy policies.
                    </li>
                  </ul>
                </li>
                
                <li>
                  <strong>Disclaimer of Guarantees and Responsibility/Liability Constraints:</strong>
                  <ul>
                    <li>The platform is provided "as is," with no guarantees for accuracy or reliability.</li>
                    <li>
                      The platform disclaims liability for damages resulting from unauthorized access, data breaches, or site interruptions.
                    </li>
                  </ul>
                </li>
                
                <li>
                  <strong>Our Rights:</strong>
                  <ul>
                    <li>
                      The platform reserves the right to take legal action for unauthorized use or violation of its intellectual property rights.
                    </li>
                    <li>
                      Users must compensate the platform for any damages caused by misuse or violations.
                    </li>
                  </ul>
                </li>
                
                <li>
                  <strong>The Applicable Law:</strong>
                  <ul>
                    <li>
                      All disputes are subject to the laws of the Arab Republic of Egypt and fall under the jurisdiction of Cairo courts.
                    </li>
                  </ul>
                </li>
                
                <li>
                  <strong>Means of Communication and Contact:</strong>
                  <ul>
                    <li>
                      For questions or inquiries about these terms, contact us via email or phone.
                    </li>
                  </ul>
                </li>
              </ol>
              </pre>              
          </div>
        </div>

        <h5 class="col-span-12 mb-2.5 uppercase xl:text-lg">
          {{ $t("TITLES.privacyPolicy") }}
        </h5>

        <div class="mb-5 rounded-lg border border-inputBg-dark p-3.5">
          <div class="max-h-[200px] overflow-auto">
            <pre>
              <h2>Privacy Policy of ARABMLS</h2>
              <p>
              The platform ARABMLS (referred to as "I," "we," or "ARABMLS") takes your privacy seriously and complies with protecting the privacy of all visitors and contributors to our website <a href="https://www.arabmls.org">www.arabmls.org</a> or any application associated with it. This policy outlines how we collect, use, store, and share your information.
              </p>
              <p>
              By accessing the platform or using our services, you agree to the terms of this privacy policy. If you disagree, you should refrain from using the platform and its services. ARABMLS reserves the right to amend this policy, and changes will be effective upon publication on the website.
              </p>
              
              <h3>Kinds of Collected Information</h3>
              
              <ol>
                <li>
                  <strong>Personal and Demographic Information:</strong>
                  <ul>
                    <li>We collect personal information such as name, address, phone number, and email address when you visit the site or interact with surveys and offers.</li>
                    <li>Demographic information, such as postal code, age group, income, and education level, is also collected voluntarily.</li>
                    <li>The data is primarily used for internal business and marketing purposes.</li>
                    <li>ARABMLS may share information with third parties for product and service offerings or when required by law.</li>
                    <li>To review or correct your personal information or request its deletion, contact us in writing.</li>
                  </ul>
                </li>
              
                <li>
                  <strong>Visitor Computer Information:</strong>
                  <ul>
                    <li>We use cookies to collect data about your device and access patterns to improve your experience.</li>
                    <li>Cookies help us allocate your usage and make your visit more enjoyable.</li>
                  </ul>
                </li>
              
                <li>
                  <strong>Employment Inquiries:</strong>
                  <ul>
                    <li>Personal information submitted for employment purposes is used only for that purpose.</li>
                  </ul>
                </li>
              
                <li>
                  <strong>Security:</strong>
                  <ul>
                    <li>ARABMLS takes precautions to protect your data from loss, misuse, or unauthorized access.</li>
                    <li>Employees handling your information are required to maintain confidentiality.</li>
                  </ul>
                </li>
              
                <li>
                  <strong>Secure Access to Photographic Identification:</strong>
                  <ul>
                    <li>To access secure areas of the site, ARABMLS may require government-issued ID for identity verification.</li>
                    <li>Information from IDs is used only for secure access purposes and is not shared except as legally required.</li>
                  </ul>
                </li>
              
                <li>
                  <strong>Children:</strong>
                  <ul>
                    <li>The site is not directed at children under 18 years old.</li>
                    <li>If we receive information from a child without parental consent, we will only use it to respond directly and will not retain it.</li>
                  </ul>
                </li>
              </ol>
              
              <h3>Contacting ARABMLS</h3>
              <p>
              If you have questions about this policy or the site, you can contact us via email, phone, or post.
              </p>
              
              <h3>Terms of Contribution</h3>
              <ol>
                <li>
                  I agree to comply with all related regulations, including:
                  <ul>
                    <li>Paying membership fees (non-refundable).</li>
                    <li>Actively participating in real estate activities, such as offering real estate sale and purchase services or listing properties with ARABMLS.</li>
                  </ul>
                </li>
                <li>
                  I will continue contributing to ARABMLS activities during my membership. Failure to comply may result in suspension or termination.
                </li>
                <li>
                  I accept full responsibility for any violations of ARABMLS rules caused by me or my partners.
                </li>
                <li>
                  I agree to complete required training courses and pay all dues at the time of application submission.
                </li>
                <li>
                  I affirm the authenticity of all submitted documents and am legally responsible for any content I post on the ARABMLS site.
                </li>
              </ol>
              </pre>              
          </div>
        </div>

        <VeeForm
          as="div"
          :validation-schema="signatureSchema"
          @submit="handleSignature"
          :initialValues="initialValues"
        >
          <form>
            <VeeField
              as="div"
              class="mb-2.5"
              name="signature"
              v-slot="{ meta }"
            >
              <label
                for="signature"
                class="mb-2 block font-medium"
                :class="meta.touched && !meta.valid && 'text-error'"
                >{{ $t("TITLES.signature") }}</label
              >

              <div
                class="flex h-[50px] items-center justify-between gap-3 overflow-hidden rounded-lg border border-dashed"
                :class="
                  meta.touched && !meta.valid
                    ? 'border-error'
                    : 'border-[#262626]'
                "
              >
                <input
                  id="signature"
                  type="text"
                  v-model="signature"
                  :placeholder="$t('TITLES.signature')"
                  class="block h-full flex-grow bg-[#F8F9F9] px-5 dark:bg-transparent"
                  :class="
                    meta.touched && !meta.valid
                      ? 'placeholder:text-error'
                      : 'dark:placeholder:text-[#414141]'
                  "
                />

                <button
                  type="button"
                  class="px-5 text-error"
                  @click="signature = ''"
                >
                  {{ $t("BUTTONS.clearSignPad") }}
                </button>
              </div>
            </VeeField>

            <div class="mb-5 flex justify-end">
              <div class="flex items-center gap-2">
                <span class="font-bold text-title-light dark:text-white">
                  {{ $t("LABELS.applicationFees") }}:
                </span>

                <span class="text-primary"
                  >{{ applicationFees }} {{ $t("TITLES.AED") }}</span
                >
              </div>
            </div>

            <div class="mb-5">
              <div class="flex items-center justify-between gap-3">
                <label for="signature" class="mb-2 block font-medium">
                  {{ $t("TITLES.signature") }}
                </label>

                <div
                  v-if="!initialValues.signatureAsImg"
                  class="flex items-center gap-2"
                >
                  <button type="button" @click="clearSignature">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                  </button>

                  <button type="button" @click="undoSignature">
                    <font-awesome-icon icon="fa-solid fa-redo" />
                  </button>
                </div>
              </div>

              <div
                class="rounded-lg border border-dashed border-boxDB-dark p-1"
                v-if="!initialValues.signatureAsImg"
              >
                <Vue3Signature
                  ref="signatureAsImg"
                  :sigOption="{
                    penColor:
                      $colorMode.value == 'dark' ? '#ffffff' : '#000000',
                    backgroundColor:
                      $colorMode.value == 'dark' ? '#0b0909' : '#ffffff',
                  }"
                ></Vue3Signature>
              </div>
              <img v-else :src="initialValues.signatureAsImg" alt="signature" />
            </div>

            <div
              class="flex w-full items-center gap-3 font-medium text-white"
              :class="
                $colorMode.value === 'light' ? 'justify-end' : 'justify-start'
              "
            >
              <GlobalsButton
                type="button"
                :text="$t('BUTTONS.back')"
                class="w-fit border border-[#CE11271A] bg-[#141313] px-5 duration-300 hover:bg-primary"
                :disabled="signatureLoading"
                @handleClick="step = 3"
              />

              <GlobalsButton
                type="submit"
                :text="$t('BUTTONS.next')"
                class="w-fit bg-primary"
                :disabled="signatureLoading"
              />
            </div>
          </form>
        </VeeForm>
      </div>
      <!-- End of the signature -->
    </template>
    <!-- {{authStore.profileData.broker.branch_id}} -->
  </div>
</template>

<script setup>
import Vue3Signature from "vue3-signature";
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { configure } from "vee-validate";
import { useAuthStore } from "~/store/auth";

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const formPopulateData = JSON.parse(localStorage.getItem('temporaryProfileData'))

const i18n = useI18n();

useHead({
  title: i18n.t("BUTTONS.register"),
  script: [
    {
      src: "https://www.merchant.geidea.net/hpp/geideaCheckout.min.js",
    },
  ],
});

definePageMeta({
  layout: "auth",
});

const toast = useToast();

const authStore = useAuthStore();

const checkRegisterStep = computed(() => {
  if (Object.keys(authStore.registrationData).length) {
    if (authStore.registrationData.register_complete_step === 0) {
      return 2;
    } else if (authStore.registrationData.register_complete_step === 2) {
      return 5;
    } else {
      return 1;
    }
  } else {
    return 1;
  }
});

const localePath = useLocalePath();

const router = useRouter();

const paymentModal = ref(false);

const {
  public: { baseURL },
} = useRuntimeConfig();

const headers = {
  "Accept-Language": i18n.locales.value.find(
    (item) => item.code === i18n.locale.value,
  )?.iso,
  Lang: i18n.locale.value,
  Authorization: `Bearer ${authStore.verificationData.token}`,
};

/* Get the company data */
const paymentData = ref(null);

if (authStore.registrationData && authStore.registrationData.company_id) {
  await useAsyncData("company_Data", () =>
    $fetch("/get-company-by-id", {
      baseURL,
      headers,
      params: {
        company_id: authStore.registrationData.company_id,
      },
    })
      .then((res) => {
        paymentData.value = res.data.company_setting;

        if (authStore.registrationData.register_complete_step === 2) {
          if (
            paymentData.value &&
            paymentData.value.enable_payment_for_application === 1
          ) {
            toast.success(i18n.t("TEXTS.waitingForPayment"));

            paymentModal.value = true;
          } else {
            SubmitApplicationFees();
          }
        }
      })
      .catch((e) => console.error(e)),
  );
}
/* End of the function that get the company data */

const loadingAllData = ref(false);

/* Start of the registration steps */
const step = ref(checkRegisterStep.value);

/* Start of the function that get all companies */
const allCompanies = ref([]);
const companiesOptions = ref([]);
const currentCompany = ref(null);

const branchesOptions = ref([]);

const resetBranch = ref(false);

function getCompanyBranches(id) {
  const company = allCompanies.value.find((company) => company.id === id);

  if (company) {
    branchesOptions.value = company.branches;
  }
}

const allCompaniesData = ref([]);

const allCompaniesLoading = ref(false);
async function getAllCompanies() {
  allCompaniesLoading.value = true;

  await $fetch("/companies", {
    baseURL,
    headers,
    params: {
      company_name: "brokerage_company",
    },
  })
    .then((res) => {
      allCompaniesData.value = res.data;

      const companies = res.data.map((item) => item.company);

      allCompanies.value = companies;

      companies.forEach((company) => {
        companiesOptions.value.push({
          id: company.id,
          name: company.name,
        });
      });
    })
    .catch((e) => console.error(e))
    .finally(() => (allCompaniesLoading.value = false));
}
/* End of the function that get all companies */

/* Start of the brokerage information */
const brokerageInitialValues = ref({});
const brokerageSchema = yup.object().shape({
  company: yup.string().required(i18n.t("ERRORS.companyRequired")),
  branch: yup
    .string()
    .test("branch", i18n.t("ERRORS.branchRequired"), (value, ctx) => {
      return ctx.from[0].value.company ? true : false;
    }),
});

if (authStore.registrationData && authStore.registrationData.company_id) {
  brokerageInitialValues.value = {
    company: authStore.registrationData.company_id,
    branch: authStore.registrationData.branch_id,
    email: authStore.registrationData.company_email,
  };
}

const currentBranch = ref(null);

const brokerageLoading = ref(false);
async function handleBrokerageInfo(values) {
  if (branchesOptions.value) {
    if (
      branchesOptions.value.find((branch) => branch.id === currentBranch.value)
    ) {
      step.value = 2;

      const company = allCompanies.value.find(
        (company) => company.id === currentCompany.value,
      );

      allValues.value = { ...allValues.value, ...values };

      brokerageInitialValues.value = {
        company_id: company.id,
        branch_id: values.branch,
        name: company.name,
        email: company.email,
        phone: company.phone,
        address: company.address,
        faxNumber: {
          phone_number: company.fax_number ? company.fax_number : "",
        },
        website: company.website,
        brokerageTaxIdNumber: company.tax_id,
        brokerageCommercialRegistrationNumber: company.commercial_registration,
      };
    } else {
      resetBranch.value = false;
      resetBranch.value = true;

      toast.error(i18n.t("ERRORS.selectCompanyBranch"));
    }
  }
}

function getMinAgeDate(age) {
  const today = new Date(); // Get the current date
  const year = today.getFullYear() - age; // Subtract the age from the current year
  const month = today.getMonth(); // Keep the same month
  const day = today.getDate(); // Keep the same day
  return new Date(year, month, day); // Return the adjusted date
}
/* End of the brokerage information */

const MIN_AGE = 18

function isValidEgyptianID(id) {
  // Ensure it's a 14-digit number
  if (!/^\d{14}$/.test(id)) return false;

  const century = parseInt(id[0], 10);
  if (century !== 2 && century !== 3) return false;

  // Extract birthdate
  const year = century === 2 ? "19" + id.substring(1, 3) : "20" + id.substring(1, 3);
  const month = parseInt(id.substring(3, 5), 10);
  const day = parseInt(id.substring(5, 7), 10);

  // Validate date
  const birthDate = new Date(`${year}-${month}-${day}`);
  if (isNaN(birthDate.getTime())) return false;

  // Ensure the person is at least 18 years old
  const minDate = getMinAgeDate(18); // Function from before
  if (birthDate > minDate) return false;

  return true;
}


/* Start of the principles broker information */
const principlesInitialValues = ref({});
const principlesBrokerSchema = yup.object().shape({
  // fName: yup.string().required(i18n.t("ERRORS.fNameRequired")),
  // middleName: yup.string().required(i18n.t("ERRORS.middleNameRequired")),
  // lName: yup.string().required(i18n.t("ERRORS.lNameRequired")),
  birthDate: yup
    .date()
    .required(i18n.t("ERRORS.birthDateRequired"))
    .max(
      getMinAgeDate(MIN_AGE),
      i18n.t("ERRORS.birthDateMinAge", { age: MIN_AGE })
    ),
  nationality: yup.string().required(i18n.t("ERRORS.nationalityRequired")),
  gender: yup.string().required(i18n.t("ERRORS.genderRequired")),
  nationalId: yup
    .string()
    .required(i18n.t("ERRORS.nationalIDRequired"))
    .test(
      "is-valid-id",
      i18n.t("ERRORS.invalidNationalID"),
      (value) => isValidEgyptianID(value),
  ),
  direct_phone_number: yup.object().shape({
    phone_number: yup
      .string()
      .required(i18n.t("ERRORS.phoneNumberRequired"))
      .test(
        "phone-number-length",
        i18n.t("ERRORS.phoneNumberLength"),
        function (value) {
          const { phone_limit } = this.parent;
          const phoneLimitNumber = Number(phone_limit);
          const errorMessage = i18n.t("ERRORS.phoneNumberLength", {
            number: phoneLimitNumber,
          });
          return value && value.length === phoneLimitNumber
            ? true
            : this.createError({ message: errorMessage });
        },
      ),
  }),
  // second_email: yup
  //   .string()
  //   .required(i18n.t("ERRORS.emailRequired"))
  //   .email(i18n.t("ERRORS.invalidEmail")),
  // ifNotWhere: yup.string().notRequired(),
  // license: yup.string().notRequired(),
});

const communicationWay = ref("email");

const realEstate = ref("residential");

const officeAddress = ref("yes");

async function handlePrinciplesBroker(values) {
  values = {
    ...values,
    communicationWay: communicationWay.value,
    realEstate: realEstate.value,
    officeAddress: officeAddress.value,
  };

  step.value = 3;

  allValues.value = { ...allValues.value, ...values };

  principlesInitialValues.value = {
    fName: values.fName,
    middleName: values.middleName,
    lName: values.lName,
    birthDate: values.birthDate,
    nationality: values.nationality,
    gender: values.gender,
    nationalId: values.nationalId,
    direct_phone_number: {
      phone_number: values.direct_phone_number?.phone_number,
    },
    second_email: values.second_email,
    ifNotWhere: values.ifNotWhere || "",
    license: values.license || "",
  };
}
/* End of the principles broker information  */

/* Start of the documents */
const documentInitialValues = ref({});
const documentsSchema = yup.object().shape({
  nationalFrontId: yup
    .string()
    .required(i18n.t("ERRORS.nationalFrontIdRequired")),
  nationalBackId: yup
    .string()
    .required(i18n.t("ERRORS.nationalBackIdRequired")),
  // taxFrontId: yup.string().required(i18n.t("ERRORS.taxFrontIdRequired")),
  // taxBackId: yup.string().required(i18n.t("ERRORS.taxBackIdRequired")),
  // commercialRegistrationFrontId: yup
  //   .string()
  //   .required(i18n.t("ERRORS.commercialRegistrationFrontIdRequired")),
  // commercialRegistrationBackId: yup
  //   .string()
  //   .required(i18n.t("ERRORS.commercialRegistrationBackIdRequired")),
});

const documentLoading = ref(false);
async function handleDocument(values) {
  step.value = 4;

  allValues.value = { ...allValues.value, ...values };

  documentInitialValues.value = {
    nationalFrontId: values.nationalFrontId,
    nationalBackId: values.nationalBackId,
    // taxFrontId: values.taxFrontId,
    // taxBackId: values.taxBackId,
    // commercialRegistrationFrontId: values.commercialRegistrationFrontId,
    // commercialRegistrationBackId: values.commercialRegistrationBackId,
  };
}
/* End of the documents */

/* Start of the signature */
const signature = ref("");

const signatureSchema = yup.object().shape({
  signature: yup
    .string()
    .test("signature", i18n.t("ERRORS.signatureRequired"), () => {
      return signature.value.trim() ? true : false;
    })
    .notRequired(),
});

const signatureLoading = ref(false);
async function handleSignature(values) {
  allValues.value = {
    ...allValues.value,
    ...values,
    signatureAsImg: signatureAsImg.value.save("image/jpeg"),
  };

  const frmData = new FormData();

  function setCompanyData(item) {
    frmData.append("brokerage_address", item.company.address);
    frmData.append("name", item.company.name);
    frmData.append("email", item.company.email);
    frmData.append("country_code_brokerage_phone_number", "20");
    if (item.phone) {
      frmData.append("brokerage_phone_number", item.phone);
    }
    if (item.company.fax_code_number) {
      frmData.append(
        "country_code_brokerage_fax_number",
        item.company.fax_code_number,
      );
    }
    if (item.company.fax_number) {
      frmData.append("brokerage_fax_number", item.company.fax_number);
    }
    frmData.append("website", item.company.website);
    frmData.append("brokerage_tax_id", item.company.tax_id);
    if (item.company.commercial_registration) {
      frmData.append(
        "brokerage_commercial_registration",
        item.company.commercial_registration,
      );
    }
  }

  if (authStore.registrationData.company_id) {
    frmData.append("company_id", authStore.registrationData.company_id);

    const item = allCompaniesData.value.find(
      (company) => company.company.id == authStore.registrationData.company_id,
    );

    setCompanyData(item);
  } else {
    const item = allCompaniesData.value.find(
      (company) => company.company.name === allValues.value.company,
    );

    frmData.append("company_id", item.id);

    setCompanyData(item);
  }

  frmData.append(
    "branch_id",
    authStore.profileData.broker.branch_id
      ? authStore.profileData.broker.branch_id
      : allValues.value.branch_id,
  );

  // =================================================================
  frmData.append("first_name", formPopulateData.name.split(' ')[0]);
  // frmData.append("middle_name", allValues.value.middleName);
  frmData.append("last_name", formPopulateData.name.split(' ').length > 1 ? formPopulateData.name.split(' ')[1] : '')
  frmData.append(
    "date_of_birth",
    reformatDate(new Date(allValues.value.birthDate).toLocaleDateString()),
  );
  frmData.append("nationality", allValues.value.nationality);
  frmData.append("gender", allValues.value.gender);
  frmData.append("government_national_id", allValues.value.nationalId);
  frmData.append(
    "country_code_direct_phone_number",
    allValues.value.direct_phone_number.phone_code,
  );
  frmData.append(
    "direct_phone_number",
    allValues.value.direct_phone_number.phone_number,
  );
  frmData.append("broker_email", formPopulateData.email);
  frmData.append("way_of_communication", allValues.value.communicationWay);
  frmData.append("real_estate_specialty", allValues.value.realEstate);
  frmData.append(
    "is_office_principal",1
  );
  frmData.append("principal_place_of_business", allValues.value.ifNotWhere);
  if (
    allValues.value.ifNotWhere &&
    allValues.value.license !== "undefined" &&
    allValues.value.license
  ) {
    frmData.append("real_estate_license", allValues.value.license);
  }
  // =================================================================
  frmData.append(
    "signature_date",
    reformatDate(new Date().toLocaleDateString()),
  );
  frmData.append("signature_full_name", allValues.value.signature);
  frmData.append("digital_signature", allValues.value.signatureAsImg);
  // =================================================================
  frmData.append("national_id_f", allValues.value.nationalFrontId);
  frmData.append("national_id_b", allValues.value.nationalBackId);
  // frmData.append(
  //   "commercial_registration_f",
  //   allValues.value.commercialRegistrationFrontId,
  // );
  // frmData.append(
  //   "commercial_registration_b",
  //   allValues.value.commercialRegistrationBackId,
  // );
  // frmData.append("tax_id_f", allValues.value.taxFrontId);
  // frmData.append("tax_id_b", allValues.value.taxBackId);

  signatureLoading.value = true;
  
  if(authStore.registrationData.app_paid){
    await $fetch("/account/application/updateNew", {
    method: "POST",
    baseURL,
    headers,
    body: frmData,
  })
    .then(() => {
      router.push(localePath("/auth/status"));
    })
    .catch((e) => {
      console.error(e);
      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (signatureLoading.value = false));
    return
  }
  await $fetch("/account/application/update", {
    method: "POST",
    baseURL,
    headers,
    body: frmData,
  })
    .then(() => {
      if (
        paymentData.value &&
        paymentData.value.enable_payment_for_application === 1
      ) {
        toast.success(i18n.t("TEXTS.waitingForPayment"));

        paymentModal.value = true;
      } else {
        SubmitApplicationFees();
      }
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (signatureLoading.value = false));
}
/* End of the signature */
/* End of the registration steps */

// =================================================================
const allValues = ref({});

const signatureAsImg = ref(null);

function clearSignature() {
  signatureAsImg.value.clear();
}
function undoSignature() {
  signatureAsImg.value.undo();
}

function reformatDate(dateString) {
  let parts = dateString.split("/");
  let month = parts[0];
  let day = parts[1];
  let year = parts[2];

  month = month.padStart(2, "0");
  day = day.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const initialValues = ref({});
const profileData = authStore.verificationData;
const fetchDataInInputs = () => {
  // fetch all data from the API and populate the initialValues
  initialValues.value.name = profileData?.user?.broker?.name;
  initialValues.value.email = profileData?.user?.broker?.email;
  initialValues.value.address = profileData?.user?.broker?.brokerage_address;
  initialValues.value.website = profileData?.user?.broker?.website;
  initialValues.value.brokerageTaxIdNumber =
    profileData?.user?.broker?.brokerage_tax_id;
  initialValues.value.brokerageCommercialRegistrationNumber =
    profileData?.user?.broker?.brokerage_commercial_registration;
  initialValues.value.phone = {
    phone_code:
      profileData?.user?.broker?.country_code_brokerage_phone_number || "20",
    phone_number: profileData?.user?.broker?.brokerage_phone_number,
  };
  initialValues.value.faxNumber = {
    phone_code:
      profileData?.user?.broker?.country_code_brokerage_fax_number || "20",
    phone_number: profileData?.user?.broker?.brokerage_fax_number,
  };
  initialValues.value.first_name = profileData?.user?.broker?.first_name;
  initialValues.value.middleName = profileData?.user?.broker?.middle_name;
  initialValues.value.lName = profileData?.user?.broker?.last_name;
  initialValues.value.birthDate = new Date(
    profileData?.user?.broker?.date_of_birth,
  );
  initialValues.value.nationality = profileData?.user?.broker?.nationality;
  initialValues.value.gender = profileData?.user?.broker?.gender;
  initialValues.value.nationalId =
    profileData?.user?.broker?.government_national_id;
  initialValues.value.direct_phone_number = {
    phone_code:
      profileData?.user?.broker?.country_code_direct_phone_number || "20",
    phone_number: profileData?.user?.broker?.direct_phone_number,
  };
  initialValues.value.second_email = profileData?.user?.broker?.broker_email;
  communicationWay.value = profileData?.user?.broker?.way_of_communication;
  realEstate.value = profileData?.user?.broker?.real_estate_specialty;
  officeAddress.value =
    profileData?.user?.broker?.is_office_principal === 1 ? "yes" : "no";
  initialValues.value.ifNotWhere =
    profileData?.user?.broker?.principal_place_of_business;
  initialValues.value.license = profileData?.user?.broker?.real_estate_license;
  initialValues.value.signature =
    profileData?.user?.broker?.signature_full_name;
  signature.value = profileData?.user?.broker?.signature_full_name;
  initialValues.value.signatureAsImg =
    profileData?.user?.broker?.digital_signature;
  initialValues.value.nationalFrontId = profileData?.user?.broker?.media.find(
    (el) => el.custom_properties.type == "national_id_f",
  ).file_name;
  initialValues.value.nationalBackId = profileData?.user?.broker?.media.find(
    (el) => el.custom_properties.type == "national_id_b",
  ).file_name;
  // initialValues.value.commercialRegistrationFrontId =
  //   profileData?.user?.broker?.media.find(
  //     (el) => el.custom_properties.type == "commercial_registration_f",
  //   ).file_name;
  // initialValues.value.commercialRegistrationBackId =
  //   profileData?.user?.broker?.media.find(
  //     (el) => el.custom_properties.type == "commercial_registration_b",
  //   ).file_name;
  // initialValues.value.taxFrontId = profileData?.user?.broker?.media.find(
  //   (el) => el.custom_properties.type == "tax_id_f",
  // ).file_name;
  // initialValues.value.taxBackId = profileData?.user?.broker?.media.find(
  //   (el) => el.custom_properties.type == "tax_id_b",
  // ).file_name;

  loadingAllData.value = true;
};

const applicationFees = ref(null);
watch(
  () => step.value,
  () => {
    if (step.value == 3) {
      getApplicationFees();
    }
  },
  { deep: true },
);
async function getApplicationFees() {
  await $fetch("/payment/applicationFees", {
    method: "GET",
    baseURL,
    headers,
  })
    .then((res) => {
      applicationFees.value = res.data.application_fees;
    })
    .catch((e) => {
      console.error(e);
    });
}

const currentPaymentTransaction = ref(null);

watch(
  () => step.value,
  () => {
    if (step.value == 4 && profileData?.user?.broker?.brokerage_phone_number) {
      SubmitApplicationFees();
    }
  },
  { deep: true },
);
async function SubmitApplicationFees() {
  await $fetch("/payment/submitApplication", {
    method: "GET",
    baseURL,
    headers,
  })
    .then((res) => {
      currentPaymentTransaction.value = res.data.payment_transaction;

      startPayment();
    })
    .catch((e) => {
      console.error(e);
    });
}

function startPayment() {
  const payment = new GeideaCheckout(
    onPaymentSuccess,
    onPaymentError,
    onPaymentCancel,
  );

  payment.startPayment(currentPaymentTransaction.value.session_id);
}

async function onPaymentSuccess() {
  $fetch("/payment/paymentComplete", {
    baseURL,
    headers,
    body: {
      id: currentPaymentTransaction.value.id,
      order: {
        status: "Success",
        merchantReferenceId: currentPaymentTransaction.value.success_indicator,
      },
    },
    method: "POST",
  })
    .then((res) => {
      authStore.setProfile(res.data.user);
      authStore.setVerificationData(res.data);

      router.push(localePath("/auth/status"));
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (currentPaymentTransaction.value = null));
}

async function onPaymentError() {
  $fetch("/payment/paymentRejected", {
    baseURL,
    headers,
    body: {
      id: currentPaymentTransaction.value.id,
    },
    method: "POST",
  })
    .then(() => toast.success(i18n.t("TEXTS.paymentFailed")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (currentPaymentTransaction.value = null));
}

async function onPaymentCancel() {
  $fetch("/payment/paymentCanceled", {
    baseURL,
    headers,
    body: {
      id: currentPaymentTransaction.value.id,
    },
    method: "POST",
  })
    .then(() => toast.success(i18n.t("TEXTS.paymentCancelled")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (currentPaymentTransaction.value = null));
}

onMounted(() => {
  if (profileData?.user?.broker?.brokerage_phone_number) {
    loadingAllData.value = false;

    fetchDataInInputs();
  } else {
    loadingAllData.value = true;
  }

  getAllCompanies();
});
</script>

<style lang="scss" scoped></style>
