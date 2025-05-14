import { buildQueryString } from "../../../helpers/commonFunction";
import Utils from "../../../utils";
import { failedLeadReducer, loaderListener, successLeadReducer } from "../slice/leadSlice";

export const fetchLeadList = (values, dispatch) => {

    const {
        page,
        limit,
        search,
        fromDate,
        toDate,
        status,
        subscription,
        type,
    } = values;

    let dataToSend = {
        page: page + 1,
        limit,
        search,
        fromDate,
        toDate,
        status,
        subscription,
        type,
    }

    // Define an array of keys to check for falsy values
    const keysToDelete = ['search', 'fromDate', 'toDate', 'status', 'subscription', 'type'];

    // Iterate through the keys and delete them if they are falsy in dataToSend
    keysToDelete.forEach(key => {
        if (!dataToSend[key]) {
            delete dataToSend[key];
        }
    });

    dispatch(
        loaderListener({
            loading: true
        })
    );

    const result = buildQueryString(dataToSend);
    Utils.api.getApiCall(
        `/leads`,
        Object.keys(dataToSend).length == 0 ? '' : `?${result}`,
        (respData) => {
            const { data } = respData;
            dispatch(
                loaderListener({
                    loading: false
                })
            );
            dispatch(
                successLeadReducer({
                    data: data.data.data,
                    total: data.data.total,
                    loading: false
                })
            );
        },
        (error) => {
            Utils.showAlert(2, error.message);
            dispatch(failedLeadReducer(error.detail));
        }
    );

}

export const addLeadApiCall = (values, setSubmitting, refetch) => {
    const dataToSend = { ...values }
    Utils.api.postApiCall(
        `/leads/create`,
        dataToSend,
        (respData) => {
            Utils.showAlert(1, "Lead Added")
            setSubmitting(false);
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
            setSubmitting(false);
        }
    )
}

export const updateLeadApiCall = (values, leadId, setSubmitting, refetch) => {
    const dataToSend = values
    Utils.api.putApiCall(
        `/leads/${leadId}`,
        dataToSend,
        (respData) => {
            Utils.showAlert(1, "Lead Updated")
            setSubmitting(false);
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
            setSubmitting(false);
        }
    )
}

export const deleteLeadApiCall = (leadId, refetch) => {
    Utils.api.deleteApiCall(
        `/leads/${leadId}`,
        '',
        () => {
            Utils.showAlert(1, "Lead Deleted")
            refetch();
        },
        (error) => {
            console.log(error);
            const { data } = error
            Utils.showAlert(2, data.message || data?.non_field_errors[0])
        }
    )
}