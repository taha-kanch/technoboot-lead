import { signin } from '../slice'
import { Utils } from '../../../utils'

export const login = (values, setSubmitting, navigate, dispatch) => {
  const dataToSend = {
    ...values
  }
  Utils.api.postApiCall(
    `/auth/login`,
    dataToSend,
    (respData) => {
      const { data } = respData;
      console.log(data)
      Utils.showAlert(1, "Login successful");
      dispatch(signin({ data: data.data.user }))
      localStorage.setItem('accessToken', data.data.token)
      navigate(`/dashboard/home`);
      setSubmitting(false);
    },
    (error) => {
      console.log(error)
      Utils.showAlert(2, error.data.errorMessage)
      setSubmitting(false)
      dispatch(signin({ data: {} }))
    }
  )
}

export const signup = (values, setSubmitting, navigate, dispatch) => {
  const dataToSend = {
    ...values
  }

  Utils.api.postApiCall(
    `/auth/register`,
    dataToSend,
    (respData) => {
      Utils.showAlert(1, "Signup successful")
      setSubmitting(false)
      navigate(`/login`);
    },
    (error) => {
      Utils.showAlert(2, "SignUp failed")
      setSubmitting(false)
    }
  )
}
