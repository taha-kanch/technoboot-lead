export const buildQueryString = (dataToSend) => {
    // Create an array of key-value pairs
    const queryStringArray = Object.entries(dataToSend)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    // Join the array with "&" to form the final query string
    const queryString = queryStringArray.join('&');

    return queryString;
}

export const StatusOption = [
  { label: 'New', value: 'New' },
  { label: 'No Feedback', value: 'No Feedback' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Waiting', value: 'Waiting' },
  { label: 'No Success', value: 'No Success' },
  { label: 'Order Placed', value: 'Order Placed' },
];

export const TypeOption = [
  { label: 'Sales Person', value: 'Sales Person' },
  { label: 'Buyer', value: 'Buyer' },
];

export const SubscriptionOption = [
  { label: 'Prepaid', value: 'Prepaid' },
  { label: 'Premium', value: 'Premium' },
];