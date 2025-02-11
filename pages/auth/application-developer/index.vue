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
    class="relative max-h-[95vh] min-h-[50vh] w-full overflow-y-auto overflow-x-hidden rounded-[24px] border border-transparent bg-white p-3 dark:border-[#1C1C21] dark:bg-[#0B0909] md:p-7 lg:w-[1200px]"
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
          {{ $t("TITLES.developerInformation") }}
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
      <!-- developer information -->
      <VeeForm
        v-if="step === 1"
        as="div"
        :validation-schema="developerSchema"
        @submit="handleDeveloperInfo"
        :initialValues="developerInitialValues"
      >
        <form class="grid grid-cols-12 gap-5">
          <div class="col-span-12 xl:col-span-6">
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
              :disabled="developerLoading"
            />
          </div>
        </form>
      </VeeForm>
      <!-- End of the developer information -->

      <VeeForm
        v-else-if="step === 2"
        as="div"
        :validation-schema="principlesSchema"
        @submit="handlePrinciplesDeveloper"
        :initialValues="principlesInitialValues"
      >
        <form class="grid grid-cols-12 gap-5">
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="fName"
              name="fName"
              :label="$t('LABELS.fName')"
              :placeholder="$t('INPUTS.fNamePlaceholder')"
              isChar
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
          </div>

          <!-- <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="chief_executive_name"
              name="chief_executive_name"
              :label="$t('LABELS.chief_executive_name')"
              :placeholder="$t('INPUTS.chief_executive_namePlaceholder')"
              isChar
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="chief_executive_email"
              name="chief_executive_email"
              :label="$t('LABELS.chief_executive_email')"
              :placeholder="$t('INPUTS.chief_executive_emailPlaceholder')"
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="chief_operations_name"
              name="chief_operations_name"
              :label="$t('LABELS.chief_operations_name')"
              :placeholder="$t('INPUTS.chief_operations_namePlaceholder')"
              isChar
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="chief_operations_email"
              name="chief_operations_email"
              :label="$t('LABELS.chief_operations_email')"
              :placeholder="$t('INPUTS.chief_operations_emailPlaceholder')"
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="chief_financial_name"
              name="chief_financial_name"
              :label="$t('LABELS.chief_financial_name')"
              :placeholder="$t('INPUTS.chief_financial_namePlaceholder')"
              isChar
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="chief_financial_email"
              name="chief_financial_email"
              :label="$t('LABELS.chief_financial_email')"
              :placeholder="$t('INPUTS.chief_financial_emailPlaceholder')"
            />
          </div> -->

          <h2 class="col-span-12 text-lg font-medium">
            {{ $t("TITLES.howManyUnitsDoYouHave") }}:
          </h2>

          <div class="col-span-12 md:col-span-6">
            <label for="units_finished" class="mb-2 block font-medium">{{
              $t("LABELS.units_finished")
            }}</label>

            <div class="flex select-none items-center gap-5 font-medium">
              <label
                for="units_finished_1-10"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_finished_1-10"
                  value="1-10"
                  class="size-[20px] cursor-pointer"
                  v-model="units_finished"
                  name="units_finished"
                />

                <span>1-10</span>
              </label>

              <label
                for="units_finished_11-50"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_finished_11-50"
                  value="11-50"
                  class="size-[20px] cursor-pointer"
                  v-model="units_finished"
                  name="units_finished"
                />

                <span>11-50</span>
              </label>

              <label
                for="units_finished_50-100"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_finished_50-100"
                  value="50-100"
                  class="size-[20px] cursor-pointer"
                  v-model="units_finished"
                  name="units_finished"
                />

                <span>50-100</span>
              </label>

              <label
                for="units_finished_Greater than 100"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_finished_Greater than 100"
                  value="Greater than 100"
                  class="size-[20px] cursor-pointer"
                  v-model="units_finished"
                  name="units_finished"
                />

                <span>{{ $t("TITLES.Greater_than_100") }}</span>
              </label>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <label
              for="units_under_construction"
              class="mb-2 block font-medium"
              >{{ $t("LABELS.units_under_construction") }}</label
            >

            <div class="flex select-none items-center gap-5 font-medium">
              <label
                for="units_under_construction_1-10"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_under_construction_1-10"
                  value="1-10"
                  class="size-[20px] cursor-pointer"
                  v-model="units_under_construction"
                  name="units_under_construction"
                />

                <span>1-10</span>
              </label>

              <label
                for="units_under_construction_11-50"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_under_construction_11-50"
                  value="11-50"
                  class="size-[20px] cursor-pointer"
                  v-model="units_under_construction"
                  name="units_under_construction"
                />

                <span>11-50</span>
              </label>

              <label
                for="units_under_construction_50-100"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_under_construction_50-100"
                  value="50-100"
                  class="size-[20px] cursor-pointer"
                  v-model="units_under_construction"
                  name="units_under_construction"
                />

                <span>50-100</span>
              </label>

              <label
                for="units_under_construction_Greater than 100"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_under_construction_Greater than 100"
                  value="Greater than 100"
                  class="size-[20px] cursor-pointer"
                  v-model="units_under_construction"
                  name="units_under_construction"
                />

                <span>{{ $t("TITLES.Greater_than_100") }}</span>
              </label>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <label
              for="units_expected_to_be_completed"
              class="mb-2 block font-medium"
              >{{ $t("LABELS.units_expected_to_be_completed") }}</label
            >

            <div class="flex select-none items-center gap-5 font-medium">
              <label
                for="units_expected_to_be_completed_1-10"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_expected_to_be_completed_1-10"
                  value="1-10"
                  class="size-[20px] cursor-pointer"
                  v-model="units_expected_to_be_completed"
                  name="units_expected_to_be_completed"
                />

                <span>1-10</span>
              </label>

              <label
                for="units_expected_to_be_completed_11-50"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_expected_to_be_completed_11-50"
                  value="11-50"
                  class="size-[20px] cursor-pointer"
                  v-model="units_expected_to_be_completed"
                  name="units_expected_to_be_completed"
                />

                <span>11-50</span>
              </label>

              <label
                for="units_expected_to_be_completed_50-100"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_expected_to_be_completed_50-100"
                  value="50-100"
                  class="size-[20px] cursor-pointer"
                  v-model="units_expected_to_be_completed"
                  name="units_expected_to_be_completed"
                />

                <span>50-100</span>
              </label>

              <label
                for="units_expected_to_be_completed_Greater than 100"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="units_expected_to_be_completed_Greater than 100"
                  value="Greater than 100"
                  class="size-[20px] cursor-pointer"
                  v-model="units_expected_to_be_completed"
                  name="units_expected_to_be_completed"
                />

                <span>{{ $t("TITLES.Greater_than_100") }}</span>
              </label>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <label for="units_finished_sold" class="mb-2 block font-medium">{{
              $t("LABELS.units_finished_sold")
            }}</label>

            <div class="flex select-none items-center gap-5 font-medium">
              <label for="1-10" class="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  id="1-10"
                  value="1-10"
                  class="size-[20px] cursor-pointer"
                  v-model="units_finished_sold"
                  name="units_finished_sold"
                />

                <span>1-10</span>
              </label>

              <label for="11-50" class="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  id="11-50"
                  value="11-50"
                  class="size-[20px] cursor-pointer"
                  v-model="units_finished_sold"
                  name="units_finished_sold"
                />

                <span>11-50</span>
              </label>

              <label
                for="50-100"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="50-100"
                  value="50-100"
                  class="size-[20px] cursor-pointer"
                  v-model="units_finished_sold"
                  name="units_finished_sold"
                />

                <span>50-100</span>
              </label>

              <label
                for="Greater than 100"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id="Greater than 100"
                  value="Greater than 100"
                  class="size-[20px] cursor-pointer"
                  v-model="units_finished_sold"
                  name="units_finished_sold"
                />

                <span>{{ $t("TITLES.Greater_than_100") }}</span>
              </label>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="direct_phone_number"
              name="direct_phone_number"
              isNumber
              :label="$t('LABELS.direct_phone_number')"
              :placeholder="$t('INPUTS.phoneNumberPlaceholder')"
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="developer_email"
              name="developer_email"
              :label="$t('LABELS.developer_email')"
              :placeholder="$t('INPUTS.developer_emailPlaceholder')"
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <InputsBaseInput
              id="title"
              name="title"
              :label="$t('LABELS.title')"
              :placeholder="$t('INPUTS.titlePlaceholder')"
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
              :disabled="developerLoading"
              @handleClick="step = 1"
            />

            <GlobalsButton
              type="submit"
              :text="$t('BUTTONS.next')"
              class="w-fit bg-primary"
              :disabled="developerLoading"
            />
          </div>
        </form>
      </VeeForm>
      <!-- End of the principles information -->

      <!-- Document -->
      <VeeForm
        v-else-if="step === 3"
        as="div"
        :initial-values="documentsInitialValues"
        :validation-schema="documentsSchema"
        @submit="handleDocument"
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

          <!-- h5 class="col-span-12 text-lg font-medium">
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

          <-h5 class="col-span-12 text-lg font-medium">
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
          </div -->

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
All services and dealings specialized for platform www.arabmls.org, are subject to the following conditions and terms:
1-Presented and Submitted Services and Information:
All services and information presented and submitted from / to this site are subject to policy of the usage terms, and all information stated in this site are specialized for the general information of the site visitors, and they don’t mean to be relied on, by any person or entity for any reason, as substitute or instead of the vocational counseling.

2- Protection of Personal Information:
To learn about all details specialized for and related to collection and usage of the personal information, please, read privacy policy specialized for www.arabmls.org

3- Usage of Password to Access to Some Services:
*In case of issuance of platform www.arabmls.org, for you and /or your partners, as illustrated in rules and regulations, (to be kindly learned about), (jointly and individually referred to hereunder as “you” or “your/specialized for you”) of account or password or any other safe access to reach specific areas of the site, or to attain specific privileges and features in the site, you are totally fully and solely responsible for preserving and keeping confidentiality of your password, and you approve and comply with your total full responsibility for all procedures taken under your password, including for example without limitation, the unlicensed and unauthorized usage of this site or access to it by any other third party, plus you approve that platform www.arabmls.org didn’t endure, and doesn’t currently endure or won’t later endure any responsible for that.
* You approve, comply and admit that you are responsible for each usage of system / platform www.arabmls.org by you or your partners, and that you remain responsible before platform www.arabmls.org for any unlicensed and unauthorized usage by you and /or your partners.
* You approve, comply and admit validity and authenticity of the documents presented and submitted by you without platform www.arabmls.org currently or later bearing any responsibility for any matters.

4- Usage of the Platform / Site by Kids:
Site / platform www.arabmls.org is neither directed to nor specialized for being used by kids under 18 years old, “the kid” or “kids”, please, read the privacy policy of www.arabmls.org

5- Content of the Platform / Site:
*All materials and information on the platform / site, including for example without limitation, all texts, drawings, photos, artistic works and the like, in addition to the trademarks, marks of service, logos and slogans in our content, are exclusive intellectual property of site / platform www.arabmls.org, and its affiliated companies only, and are subject to the legal protection according to laws of rights of the intellectual property, printing, publishing and trademarks in Arab Republic of Egypt.
* and the purpose of their publishing and saving for you is for your information and personal usage only, and they can be neither used nor copied, reproduced, distributed, transferred, transported, announced, declared, showed, displayed, sold, licensed or exploited by any means and /or for any other purposes whatever they are without getting a prior written consent and approval from www.arabmls.org
* You approve, admit and comply with that, without www.arabmls.org currently or later bearing any responsibility for any matters, and in case of violating that, you are complied with paying to www.arabmls.org, a convenient suitable compensation for the damage and harm caused to it.

6- Links of Other Sites:
Site / platform www.arabmls.org contains or may contain links of websites and /or platforms affiliated to external foreign authorities to help you directly access to these sites through the platform / site, however platform / site www.arabmls.org is irresponsible for content of any website and /or platforms affiliated to external foreign authorities, and usage of this site and /or platforms is subject to their privacy politics and usage terms without platform / site www.arabmls.org currently or later bearing the least responsibility.

7- Disclaimer of Guarantees and Responsibility/Liability Constraints:
You approve, comply and admit that this site / platform is presented and submitted according to its content, and that site / platform www.arabmls.org and its affiliated companies, whether established or to be later established, disclaim, neither comply nor endure all legal explicit or implicit guarantees or statements, for example:
*Mistakes and/or Lapses and /or content inaccuracy
* Personal injury or properties damages resulting from or on the occasion of using the site / platform www.arabmls.org
* Any unlicensed and unauthorized access and /or hacking or breakthrough of our safe servers
* Any unlicensed and unauthorized access and /or hacking or breakthrough of personal information and /or financial information saved and stored herein
* Any breakdown and /or discontinuity of remittance to or from our site
* Any mistakes in instructions and /or mistakes in design and /or problems of security or viruses or what is known as Trojan horses viruses or similar viruses, can be transferred to or through our electronic site by means of any third party. In general, site / platform www.arabmls.org and its affiliated companies, whether established or to be later established, are totally inclusively and by no means, irresponsible for any direct or indirect, explicit or implicit, accessory or special or penal punitive damages or other damages of any kind, whether resulting from using or incapability of using our content and /or site and /or platform and /or any products or services submitted and presented through us and /or our affiliated companies, whether established or to be later established, and /or whether this responsibility is based on damage and /or the contract and /or the negligence and carelessness or others, even if we are informed about and notified of these actual or potential damages, and you approve, comply and admit that the only solution before you is to stop using our content or our electronic site without making site / platform www.arabmls.org and its affiliated companies, whether established or to be later established, liable to any responsibility or currently or later asking them for a compensation.

8- Our Rights:
Site / platform www.arabmls.org and its affiliated companies, whether established or to be later established, keep the right to take any and all necessary procedures, search for any and all available remedies to prevent the unlicensed and unauthorized usage of our content and /or website, including for example without limitation, the right to take all suitable legal procedures, get judicial and /or financial compensations for any acts or deeds representing violation of our intellectual property rights and /or misusage of our content or our site / platform in one way or another. You approve, admit and comply with compensating www.arabmls.org and its affiliated companies, whether established or to be later established, for any and /or all damages, or costs, expenditures, outlays or disbursements endured by www.arabmls.org and /or its affiliated companies, whether established or to be later established, including legal practice honorariums, costs of procedures whether against you or against third party as a result of using your password and this statement is final irrevocable and not subject to judicial control. Site / platform www.arabmls.org has right to amend and /or change policy of the usage terms anytime and site / platform www.arabmls.org will notify you of any such changes or amendments by publishing these changes and amendments on this site / platform.

9- The Applicable Law:
By visiting site / platform www.arabmls.org, you approve, comply and admit that any disputes between you and www.arabmls.org and /or its affiliated companies, whether established or to be later established, arising because of usage and /or your access to our content and /or our electronic site and /or the usage terms specialized for us and /or our politics, are all subject to laws of Arab Republic of Egypt regardless their contradiction to any other laws and /or conditions, and Cairo Courts only, in whose division our headquarter is located, are judicially competent to examine, discuss and resolve any dispute.

10- Means of Communication and Contact with Site / Platform www.arabmls.org:
If you have any questions or inquiries about these terms and conditions or our politics and you want to get more information, you can contact us via email or phone.
          </pre
            >
          </div>
        </div>

        <h5 class="col-span-12 mb-2.5 uppercase xl:text-lg">
          {{ $t("TITLES.privacyPolicy") }}
        </h5>

        <div class="mb-5 rounded-lg border border-inputBg-dark p-3.5">
          <div class="max-h-[200px] overflow-auto">
            <pre>
Platform ARABMLS (referred to, by personal pronouns, I or we or ARABMLS) seriously deals with your privacy, and it complies with protecting privacy of all visitors and contributors, participating in our website www.arabmls.org or any application which can be created by it besides the electronic site or platform, related to the personal information, demographic information, visitor computer information, when you visit our electronic site or contribute to our interactive surveys, our promotional ads and offers, and the services available through the platform “platform services”. We illustrate hereunder our privacy policy “the policy”, determining the way of treating all related to your personal information with which you provide us, and this phrase, “personal information”, means the information which enable us to know your identity and how to use these information, plus how to get copies of the personal information sent to us, and how you can check and verify their accuracy, and how you can ask to omit your personal information which can be known from our databases. Please, carefully read this policy, as it includes important information including a resume about us and how to collect, store, use and share the information by access to the platform or using our platform services or by expressing your consent and approval by another way other than that, you approve and accept – when necessary – to collect, use, transmit and transfer your information as stipulated in this policy, and if you don’t accept this policy terms, you can’t use the platform and/or the services and/or the site. This policy is complementary and supplement however isn’t substitute to the notices and other politics. ARABMLS frankly and explicitly keeps right to amend or change any or all terms and conditions of the privacy policy and any of these amendments or changes are published on the electronic site. These amendments and changes are valid and effective as of date of their publicity on this electronic site.

Kinds of Collected Information:
1-Personal Information and Demographic Information:
When you visit the electronic site and/or the platform or contribute to our interactive surveys and promotional ads and offers, we collect the personal information only like: name, address, phone no, or email address, whereas the demographic information are as the postal code, age group, income bracket, education level, voluntarily presented and submitted to us by you, replying to our demands determined for you to do that. ARABMLS mainly uses the personal and demographic information for our internal commercial business and marketing purposes to enable us to comprehend interests of our customers in a better way, and send you information about our products and services. The website contains links of other sites with which ARABMLS doesn’t share your personal information as we are irresponsible for that. ARABMLS can provide from time to time, personal information and/or demographic information voluntarily submitted and presented to third parties, providing products and services to us and/or to our customers, in addition, to third parties, neither affiliated nor subordinate to us, offering products or services which can matter to our customers, or if we believe that the disclosure or revelation is necessary for public interest and benefit, sometimes, we are legally complied with disclosing and revealing your personal information. By voluntarily providing us with the personal and demographic information, you approve our usage of your personal information as previously illustrated. You shouldn’t provide us with any personal or demographic information you don’t want to disclose or reveal to us, as if you decide not to provide us with specific personal or demographic information, your ability to access to our electronic site and its offer isn’t then affected, however in absence or lack or inexistence of specific personal information, determining and proving or confirming and assuring your identity or determining your site, or demographic information related to the interactive survey or the determined promotional ad or offer to which you contribute, you may not receive a product or another information from us to contribute to such interactive surveys, and promotional ads and offers. If you want to get copy of your personal information from us to review and audit their accuracy, make any corrections, or if you don’t want to use your personal information now or anytime later, please, inform and notify us in a written notification, and we will exert the reasonable efforts to comprehend your demand.

2- Visitor Computer Information:
The website can use as several websites, preferable to you, “cookies” to collect specific information from computer you use to access to our electronic site, which enable us to know your computer device every time you reach our electronic site through it. Our cookies can collect information about your computer device, how and when you use it to access to our electronic site. Using cookies enables us to facilitate access to specific sections in our electronic site. Sometimes, we can collect your personal information with our visitor computer information until we are able to allocate your usage of our electronic site and make your visit more fun.

3- Employment Inquiries:
The personal information presented and submitted to us are to be used related to the employment inquiries only in process of employment.

4- The Security:
ARABMLS will take reasonable precautionary measures to protect your personal information from loss or misusage or change, and deputies of ARABMLS who can access to your personal information, are asked to keep these information confidential and secret and they aren’t allowed to use these information for any other purpose, but execution and implementation of services presented and submitted by them on behalf of us.

5- Secure Access to Photographic Identification:
In case of issuance of ARABMLS for you and your partners, as determined in rules and regulations of ARABMLS, account or password or another secure access device (password) for more access to specific areas of the electronic site, or access to specific privileges and features for this electronic site, you are complied with providing ARABMLS with photographic identity card, issued from the government, including for example without limitation, the national card no, driving license, and passport to assure and confirm your identity. The photographic identity cards submitted and presented to ARABMLS are to be used related to the secure access to the website only to assure and confirm your identity and authorize you to access to secure areas in this electronic site. ARABMLS doesn’t present or submit the information stated in the photographic identity card to third parties except to the legally required extent or to the extent required by the legal procedures.

6- The Children:
The site is undirected to be used and unspecialized for usage by children/child under 18 years old. We purposely neither collect nor accept personal information from children without prior consent and approval or notice of both parents, including the father’s opportunity to use the information and contribute to the activity. If we receive anytime personal information from children without prior consent and approval of both parents, we will use these information for only direct reply to this child, and our reply will include notice that we won’t contact this child unless we receive proved and checked consent and approval of both parents, in addition to, information to the father about how to contact us to whether present or submit this consent or approval or get more information.

7- Contacting www.arabmls.org :
If you have any questions about declaration of this privacy or this site, or if you want to get more information about www.arabmls.org , you can contact us by email or post or phone: ------------------------------------------------------------------

8- To Complete Contribution to www.arabmls.org, I admit and approve the following:
1- I approve compliance with all related regulations, rules and other contribution liabilities, especially these liabilities
*Paying membership fees
And I admit that I learned about and approved schedule of fees, and I can’t by no means, ask to regain amount of the contribution fees
*I assure and confirm that I will actively do my best to operate my real estate commercial business activities including, offering services of the real estate sale and purchase and/or approving the real estate offers of ARABMLS, and listing the real estate properties of kind submitted and presented to ARABMLS.
2- I approve continuity of contributing to these activities during my participation in ARABMLS and if I don’t comply with these liabilities, my membership is suspended or terminated.
3- In addition to that, I approve compliance with rules, regulations and systems of multi-schedules service, and I also approve that I am totally fully responsible for any violations caused to these rules and regulations by me or by any of my partners.
4- I admit, comply with and understand that the training course must be completed, and all dues and fees are to be paid at time of submitting and presenting the demand, and any training required for continuity of my membership in ARABMLS, is to be complied with.
5- I admit validity and authenticity of all documents presented and submitted by me to ARABMLS and I am legally responsible for any documents or any content I post on the site of ARABMLS without ARABMLS currently or later bearing the least responsibility.
also this content
          </pre
            >
          </div>
        </div>

        <VeeForm
          as="div"
          :validation-schema="signatureSchema"
          @submit="handleSignature"
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

const localePath = useLocalePath();

const router = useRouter();

const loadingAllData = ref(false);

/* Start of the registration steps */
const step = ref(checkRegisterStep.value);

/* Start of the function that get all companies */
const allCompanies = ref([]);
const companiesOptions = ref([]);
const currentCompany = ref(null);

const branchesOptions = ref([]);

const currentBranch = ref(null);

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
      company_name: "developer_company",
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

/* Start of the developer information */
const developerInitialValues = ref({});
const developerSchema = yup.object().shape({
  company: yup.string().required(i18n.t("ERRORS.companyRequired")),
  branch: yup.string().required(i18n.t("ERRORS.branchRequired")),
});

if (authStore.registrationData && authStore.registrationData.company_id) {
  developerInitialValues.value = {
    company: authStore.registrationData.company_id,
    branch: authStore.registrationData.branch_id,
    email: authStore.registrationData.company_email,
  };
}

const developerLoading = ref(false);
async function handleDeveloperInfo(values) {
  if (branchesOptions.value.length) {
    if (
      branchesOptions.value.find((branch) => branch.id === currentBranch.value)
    ) {
      step.value = 2;

      const company = allCompanies.value.find(
        (company) => company.id === currentCompany.value,
      );

      developerInitialValues.value = {
        company_id: company.id,
        branch_id: values.branch,
        name: company.name,
        office_address: company.address,
        office_phone_number: company.phone,
        email: company.email,
        website: company.website,
        office_tax_id: company.tax_id,
        office_commercial_registration: company.commercial_registration,
      };

      allValues.value = { ...allValues.value, ...developerInitialValues.value };
    } else {
      resetBranch.value = false;
      resetBranch.value = true;

      toast.error(i18n.t("ERRORS.selectCompanyBranch"));
    }
  }
}
/* End of the developer information */

/* Start of the principles information */
const principlesInitialValues = ref({});
const principlesSchema = yup.object().shape({
  fName: yup.string().required(i18n.t("ERRORS.fNameRequired")),
  middleName: yup.string().required(i18n.t("ERRORS.middleNameRequired")),
  lName: yup.string().required(i18n.t("ERRORS.lNameRequired")),
  direct_phone_number: yup
    .string()
    .required(i18n.t("ERRORS.direct_phone_number")),
  developer_email: yup.string().required(i18n.t("ERRORS.developer_email")),
  title: yup.string().required(i18n.t("ERRORS.title")),
});

const units_finished = ref("1-10");

const units_under_construction = ref("1-10");

const units_expected_to_be_completed = ref("1-10");

const units_finished_sold = ref("1-10");

async function handlePrinciplesDeveloper(values) {
  values = {
    ...values,
    units_finished: units_finished.value,
    units_under_construction: units_under_construction.value,
    units_expected_to_be_completed: units_expected_to_be_completed.value,
    units_finished_sold: units_finished_sold.value,
  };

  principlesInitialValues.value = {
    fName: values.fName,
    middleName: values.middleName,
    lName: values.lName,
    direct_phone_number: values.direct_phone_number,
    developer_email: values.developer_email,
    title: values.title,
  };

  step.value = 3;

  allValues.value = { ...allValues.value, ...values };
}
/* End of the principles information  */

/* Start of the documents */
const documentsInitialValues = ref({});
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

  documentsInitialValues.value = {
    nationalFrontId: values.nationalFrontId,
    nationalBackId: values.nationalBackId,
    // taxFrontId: values.taxFrontId,
    // taxBackId: values.taxBackId,
    // commercialRegistrationFrontId: values.commercialRegistrationFrontId,
    // commercialRegistrationBackId: values.commercialRegistrationBackId,
  };

  allValues.value = { ...allValues.value, ...values };
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
    frmData.append("office_address", item.company.address);
    frmData.append("name", item.company.name);
    frmData.append("email", item.company.email);
    if (item.phone) {
      frmData.append("office_phone_number", item.phone);
    }
    frmData.append("office_tax_id", item.company.tax_id);
    if (item.company.commercial_registration) {
      frmData.append(
        "office_commercial_registration",
        item.company.commercial_registration,
      );
    }
  }

  if (authStore.registrationData.company_id) {
    console.log(authStore.registrationData.company_id , 'authStore.registrationData.company_id');
    
    frmData.append("company_id", authStore.registrationData.company_id);

    const item = allCompaniesData.value.find(
      (company) => company.company.id == authStore.registrationData.company_id,
    );

    setCompanyData(item);
  } else {
    const item = allCompaniesData.value.find(
      (company) => company.company.name === allValues.value.name,
    );

    frmData.append("company_id", item.id);

    setCompanyData(item);
  }

  frmData.append(
    "branch_id",
    authStore.profileData.developer.branch_id
      ? authStore.profileData.developer.branch_id
      : allValues.value.branch_id,
  );
  // =================================================================
  frmData.append("first_name", allValues.value.fName);
  frmData.append("middle_name", allValues.value.middleName);
  frmData.append("last_name", allValues.value.lName);
  frmData.append("direct_phone_number", allValues.value.direct_phone_number);
  frmData.append("developer_email", allValues.value.developer_email);
  frmData.append("title", allValues.value.title);

  frmData.append("units_finished", allValues.value.units_finished);
  frmData.append(
    "units_under_construction",
    allValues.value.units_under_construction,
  );
  frmData.append(
    "units_expected_to_be_completed",
    allValues.value.units_expected_to_be_completed,
  );
  frmData.append("units_finished_sold", allValues.value.units_finished_sold);
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
  initialValues.value.name = profileData?.user?.broker?.name;

  initialValues.value.first_name = profileData?.user?.broker?.first_name;
  initialValues.value.middleName = profileData?.user?.broker?.middle_name;
  initialValues.value.lName = profileData?.user?.broker?.last_name;

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
      toast.success(i18n.t("TEXTS.paidSuccessfully"));
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
