
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AddCustomerAddressError": [
      "CustomerAddressCreationError",
      "CustomerNotLoggedInError",
      "ValidationError"
    ],
    "AddProductReviewError": [
      "CustomerAlreadyReviewedProductError",
      "InvalidInputFieldsError",
      "NotAuthorizedToAddProductReviewError",
      "ProductIdNotFoundError",
      "UnexpectedAddReviewError"
    ],
    "ArticleModelContentBlocksField": [
      "ImageRecord",
      "PageCallToActionRecord",
      "PageSectionCatalogRecord",
      "PageSectionRecord"
    ],
    "ArticleModelContentLinksField": [
      "ArticleRecord",
      "CustomComponentRecord",
      "GlossaryEntryRecord",
      "TableRecord"
    ],
    "BaseOrder": [
      "Order"
    ],
    "BulkPricingTier": [
      "BulkPricingFixedPriceDiscount",
      "BulkPricingPercentageDiscount",
      "BulkPricingRelativePriceDiscount"
    ],
    "CartSelectedOption": [
      "CartSelectedCheckboxOption",
      "CartSelectedDateFieldOption",
      "CartSelectedFileUploadOption",
      "CartSelectedMultiLineTextFieldOption",
      "CartSelectedMultipleChoiceOption",
      "CartSelectedNumberFieldOption",
      "CartSelectedTextFieldOption"
    ],
    "CatalogProductOption": [
      "CheckboxOption",
      "DateFieldOption",
      "FileUploadFieldOption",
      "MultiLineTextFieldOption",
      "MultipleChoiceOption",
      "NumberFieldOption",
      "TextFieldOption"
    ],
    "CatalogProductOptionValue": [
      "MultipleChoiceOptionValue",
      "ProductPickListOptionValue",
      "SwatchOptionValue"
    ],
    "ChangePasswordError": [
      "CustomerDoesNotExistError",
      "CustomerNotLoggedInError",
      "CustomerPasswordError",
      "ValidationError"
    ],
    "CheckoutAddress": [
      "CheckoutBillingAddress",
      "CheckoutConsignmentAddress"
    ],
    "CheckoutAddressCustomField": [
      "CheckoutAddressCheckboxesCustomField",
      "CheckoutAddressDateCustomField",
      "CheckoutAddressMultipleChoiceCustomField",
      "CheckoutAddressNumberCustomField",
      "CheckoutAddressPasswordCustomField",
      "CheckoutAddressTextFieldCustomField"
    ],
    "CreateCartMetafieldError": [
      "AlreadyExistsError",
      "LimitExceededError",
      "NotFoundError",
      "ValidationError"
    ],
    "CustomerFormFieldValue": [
      "CheckboxesFormFieldValue",
      "DateFormFieldValue",
      "MultipleChoiceFormFieldValue",
      "NumberFormFieldValue",
      "PasswordFormFieldValue",
      "TextFormFieldValue"
    ],
    "DeleteCartMetafieldError": [
      "NotAuthorisedError",
      "NotFoundError",
      "ValidationError"
    ],
    "DeleteCustomerAddressError": [
      "CustomerAddressDeletionError",
      "CustomerNotLoggedInError"
    ],
    "DesignRequestHistoryItem": [
      "ConversationMessage",
      "DesignProof",
      "DesignRequestHistoryItemDesignRequestEvent",
      "DesignRequestRevisionRequest"
    ],
    "Error": [
      "AccountCreationDisabledError",
      "AddressDoesNotExistError",
      "AlreadyExistsError",
      "CustomerAddressCreationError",
      "CustomerAddressDeletionError",
      "CustomerAddressUpdateError",
      "CustomerAlreadyReviewedProductError",
      "CustomerDoesNotExistError",
      "CustomerNotLoggedInError",
      "CustomerPasswordError",
      "CustomerRegistrationError",
      "EmailAlreadyInUseError",
      "InvalidInputFieldsError",
      "LimitExceededError",
      "NotAuthorisedError",
      "NotAuthorizedToAddProductReviewError",
      "NotFoundError",
      "ProductIdNotFoundError",
      "UnexpectedAddReviewError",
      "ValidationError"
    ],
    "File": [
      "FileImage",
      "FilePdf",
      "FileUnknown"
    ],
    "FileFieldInterface": [
      "FileField"
    ],
    "FormField": [
      "CheckboxesFormField",
      "DateFormField",
      "MultilineTextFormField",
      "NumberFormField",
      "PasswordFormField",
      "PicklistFormField",
      "PicklistOrTextFormField",
      "RadioButtonsFormField",
      "TextFormField"
    ],
    "GlossaryEntryModelDescriptionLinksField": [
      "ArticleRecord",
      "GlossaryEntryRecord"
    ],
    "LandingPageModelContentField": [
      "PageCallToActionRecord",
      "PageHeroRecord",
      "PageSectionCatalogRecord",
      "PageSectionRecord"
    ],
    "Node": [
      "Banner",
      "Blog",
      "BlogIndexPage",
      "BlogPost",
      "Brand",
      "Cart",
      "Category",
      "Checkout",
      "ContactPage",
      "NormalPage",
      "Order",
      "Product",
      "RawHtmlPage",
      "Redirect",
      "Variant"
    ],
    "NotificationChannel": [
      "NotificationChannelEmail",
      "NotificationChannelWeb"
    ],
    "PageSectionModelContentField": [
      "FaqGroupRecord",
      "FeatureGridRecord",
      "LandingPageGridRecord",
      "RichContentRecord"
    ],
    "ProductAvailability": [
      "ProductAvailable",
      "ProductPreOrder",
      "ProductUnavailable"
    ],
    "RecordInterface": [
      "ArticleRecord",
      "AuthorRecord",
      "BlogIndexPageRecord",
      "CallToActionButtonRecord",
      "CatalogCategoryRecord",
      "CategoryRecord",
      "CustomComponentRecord",
      "DesignCategoryRecord",
      "DesignRecord",
      "FaqGroupRecord",
      "FaqRecord",
      "FeatureGridFeatureRecord",
      "FeatureGridRecord",
      "FeatureIndexPageRecord",
      "GlossaryCategoryRecord",
      "GlossaryEntryRecord",
      "GlossaryIndexPageRecord",
      "HeroIconRecord",
      "HomepageRecord",
      "ImageRecord",
      "LandingPageGridRecord",
      "LandingPageLinkRecord",
      "LandingPageRecord",
      "PageCallToActionRecord",
      "PageHeroRecord",
      "PageSectionCatalogRecord",
      "PageSectionRecord",
      "PrivacyPolicyPageRecord",
      "ProductDiscoveryPageRecord",
      "RichContentRecord",
      "TableRecord",
      "TermsOfUsePageRecord",
      "TradeshowCategoryMetadataModelRecord"
    ],
    "RedirectTo": [
      "BlogPostRedirect",
      "BrandRedirect",
      "CategoryRedirect",
      "ManualRedirect",
      "PageRedirect",
      "ProductRedirect"
    ],
    "RegisterCustomerError": [
      "AccountCreationDisabledError",
      "CustomerRegistrationError",
      "EmailAlreadyInUseError",
      "ValidationError"
    ],
    "RequestResetPasswordError": [
      "ValidationError"
    ],
    "ResetPasswordError": [
      "CustomerPasswordError",
      "ValidationError"
    ],
    "SearchProductFilter": [
      "BrandSearchFilter",
      "CategorySearchFilter",
      "OtherSearchFilter",
      "PriceSearchFilter",
      "ProductAttributeSearchFilter",
      "RatingSearchFilter"
    ],
    "StoreLogo": [
      "StoreImageLogo",
      "StoreTextLogo"
    ],
    "SubmitContactUsError": [
      "ValidationError"
    ],
    "UpdateCartMetafieldError": [
      "AlreadyExistsError",
      "NotAuthorisedError",
      "NotFoundError",
      "ValidationError"
    ],
    "UpdateCustomerAddressError": [
      "AddressDoesNotExistError",
      "CustomerAddressUpdateError",
      "CustomerNotLoggedInError",
      "ValidationError"
    ],
    "UpdateCustomerError": [
      "CustomerDoesNotExistError",
      "CustomerNotLoggedInError",
      "EmailAlreadyInUseError",
      "ValidationError"
    ],
    "WebPage": [
      "BlogIndexPage",
      "ContactPage",
      "ExternalLinkPage",
      "NormalPage",
      "RawHtmlPage"
    ]
  }
};
      export default result;
    