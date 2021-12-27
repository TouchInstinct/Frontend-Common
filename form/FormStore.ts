import { observable, action } from 'mobx'

import logger from 'lib/logger'

class FormStore {
  @observable dirty: boolean = false
  @observable errors: boolean = false
  @observable submitError: Nullable<string> = null
  @observable valid: boolean = true
  @observable submitted: boolean = false
  @observable submitting: boolean = false
  @observable touched: boolean = false
  @observable loading: boolean = false

  @action
  setDirty(dirty: boolean) {
    this.dirty = dirty
  }

  @action
  setErrors(errors: boolean) {
    this.errors = errors
  }

  @action
  setSubmitError(submitError: Nullable<string>) {
    this.submitError = submitError
  }

  @action
  setSubmitted(isSubmitted: boolean) {
    this.submitted = isSubmitted
  }

  @action
  setTouched(isTouched: boolean) {
    this.touched = isTouched
  }

  @action
  setSubmitting(isSubmitting: boolean) {
    this.submitting = isSubmitting
  }

  @action
  setValid(isValid: boolean) {
    this.valid = isValid
  }

  @action
  setLoading(isLoading = true) {
    this.loading = isLoading
  }

  async handleSubmit(fn: () => void) {
    try {
      this.setTouched(true)
      this.setLoading()
      this.setSubmitError(null)

      await fn?.()

      this.setSubmitting(false)
      this.setLoading(false)
    } catch (e: unknown) {
      if (e instanceof Error) {
        logger.error(e.message)

        this.setSubmitError(e.message)
        this.setLoading(false)
      }
      else {
        logger.error('Unknown error form store')
      }
    }
  }
}

export default FormStore
