interface UserPermission {
    id: number;
    name: string;
    api: string;
    value: boolean;
  }
  
  interface MediaItem {
    id: number;
    model_type: string;
    model_id: number;
    disk: string;
    locale: string;
    file_name: string;
    name: string;
    dir: string;
    mime_type: string;
    size: number;
    custom_properties: {
      type: string;
      group: string;
      vendor: number;
    };
    order_column: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    media_url: string;
  }
  
  interface RegistrationValidation {
    id: number;
    verification_code: string;
    is_verified_phone: number;
    is_verified_email: number;
    expire_date: string;
    account_verified_at: string;
    user_id: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    no_need_verify: number;
  }
  
  interface ApplicationType {
    id: number;
    name: string;
    name_ar: string | null;
    deleted_at: string | null;
    created_at: string | null;
    updated_at: string | null;
  }
  
  interface Broker {
    id: number;
    company_id: number | null;
    branch_id: number;
    user_id: number;
    name: string;
    status: string;
    application_fees_payed_at: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    brokerage_address: string;
    governorate_id: number | null;
    country_id: number | null;
    city_id: number | null;
    brokerage_phone_number: string;
    country_code_phone: string | null;
    brokerage_fax_number: string;
    country_code_brokerage_fax_number: string | null;
    email: string;
    website: string;
    brokerage_tax_id: string;
    brokerage_commercial_registration: string;
    first_name: string;
    middle_name: string | null;
    last_name: string | null;
    date_of_birth: string;
    nationality: string;
    gender: string;
    government_national_id: string;
    direct_phone_number: string;
    country_code_direct_phone_number: string;
    broker_email: string;
    way_of_communication: string;
    real_estate_specialty: string;
    is_office_principal: number;
    principal_place_of_business: string;
    real_estate_license: string | null;
    signature_full_name: string;
    digital_signature: string;
    signature_date: string;
    opened_by_user_id: number;
    opened_at: string;
    national_id_f: string;
    national_id_b: string;
    commercial_registration_f: string | null;
    commercial_registration_b: string | null;
    tax_id_f: string | null;
    tax_id_b: string | null;
    media: MediaItem[];
  }
  
export interface UserResponse {
id: number;
company_id: number | null;
application_type_id: number;
company_type: string | null;
name: string;
mls_id: string;
email: string;
phone: string;
status: string;
training_status: string;
deleted_at: string | null;
created_at: string;
updated_at: string;
expiration_date: string;
birth_date: string | null;
gender: string | null;
send_emails: number | null;
send_text_messages: number | null;
contact_via_phone: number | null;
country_code_phone: string;
sms_usage: number;
last_active_at: string;
number_failed_logins: number;
failed_login_at: string | null;
suspended_at: string | null;
suspended_by: string | null;
second_phone: string;
email_verified_at: string | null;
verified_code: string | null;
reset_code: string | null;
register_complete_step: number;
user_type: string | null;
add_by: string;
app_paid: number;
approved: number;
package_pay: number;
profile_complete: number;
is_admin: boolean;
user_permissions: UserPermission[];
image: string;
registeration_validation: RegistrationValidation;
roles: any[]; // Or a more specific type if you know the structure
application_type: ApplicationType;
broker: Broker;
permissions: any[]; // Or a more specific type if you know the structure
media: MediaItem[];
}