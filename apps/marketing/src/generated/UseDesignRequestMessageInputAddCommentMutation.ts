/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestConversationMessageCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UseDesignRequestMessageInputAddCommentMutation
// ====================================================

export interface UseDesignRequestMessageInputAddCommentMutation_designRequestConversationMessageCreate_designRequest {
  __typename: "DesignRequest";
  id: string;
}

export interface UseDesignRequestMessageInputAddCommentMutation_designRequestConversationMessageCreate {
  __typename: "DesignRequestConversationMessageCreatePayload";
  designRequest: UseDesignRequestMessageInputAddCommentMutation_designRequestConversationMessageCreate_designRequest | null;
}

export interface UseDesignRequestMessageInputAddCommentMutation {
  designRequestConversationMessageCreate: UseDesignRequestMessageInputAddCommentMutation_designRequestConversationMessageCreate | null;
}

export interface UseDesignRequestMessageInputAddCommentMutationVariables {
  input: DesignRequestConversationMessageCreateInput;
}
