import { useState } from "react";

export function useFormErrors() {
  const [fieldErrors, setFieldErrors] = useState({});

  function applyErrors(error) {
    const errors = error?.response?.data?.errors;
    if (errors && typeof errors === "object") {
      setFieldErrors(errors);
    } else {
      setFieldErrors({});
    }
  }

  function setError(field, message) {
    setFieldErrors((prev) => ({ ...prev, [field]: message }));
  }

  function clearError(field) {
    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }

  function resetErrors() {
    setFieldErrors({});
  }

  return { fieldErrors, applyErrors, setError, clearError, resetErrors };
}
