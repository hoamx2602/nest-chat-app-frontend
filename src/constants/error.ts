import { SnackMessage } from "../interfaces";

const UNKNOW_ERROR_MESSAGE =
  "An unknow error has occured. Please try again later.";

const UNKNOW_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOW_ERROR_MESSAGE,
  type: "error",
};

export { UNKNOW_ERROR_MESSAGE, UNKNOW_ERROR_SNACK_MESSAGE };
