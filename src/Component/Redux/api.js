// const apiLink = "https://crystalsolutions.com.pk/chef_kitchen";
const apiLink = "https://crystalsolutions.com.pk/nosh_grill";
// api ma comment kia ha
const apiLinks = "https://crystalsolutions.com.pk/nosh_grill/";
// const apiLinks = "https://crystalsolutions.com.pk/madly/";

export const fetchDataMenu = async (userId) => {
  try {
    const requestBody = new URLSearchParams({ userid: userId }).toString();

    // Send POST request using fetch
    const response = await fetch(
      `https://crystalsolutions.com.pk/nosh_grill/get_usrmenu.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody,
      }
    );

    // Check if response is successful
    if (!response.ok) {
      console.error(
        `API response failed: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    // Parse the response as JSON
    const data = await response.json();

    console.log("Parsed data:", data);

    // Return the parsed data
    return data;
  } catch (error) {
    // Log and handle any errors
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchDataItem = async () => {
  try {
    const response = await fetch(`${apiLink}/get_item.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDataRaw = async () => {
  try {
    const response = await fetch(`${apiLink}/RawMaterialList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchDataAccountCode = async () => {
  try {
    const response = await fetch(`${apiLink}ChartOfAccount.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDataChartofAccount = async () => {
  try {
    const response = await fetch(
      `https://crystalsolutions.com.pk/nosh_grill/ChartOfAccount.php`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDataOrder = async () => {
  try {
    const response = await fetch(`${apiLink}/OrderList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    // console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

////////////////////////////ORDERS/////////////////

export const fetchDatamenu = async () => {
  try {
    const response = await fetch(`${apiLink}/get_item.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataDelivery = async () => {
  try {
    const response = await fetch(`${apiLink}/get_delivery.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataItemm = async () => {
  try {
    const response = await fetch(`${apiLink}/get_item.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataCategory = async () => {
  try {
    const response = await fetch(`${apiLink}/get_category.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
//js api

export const fetchDataUOM = async () => {
  try {
    const response = await fetch(`${apiLink}/get_uom.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataLocation = async () => {
  try {
    const response = await fetch(`${apiLink}/get_location.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataMOP = async () => {
  try {
    const response = await fetch(`${apiLink}/get_payment_mode.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataWaiter = async () => {
  try {
    const response = await fetch(`${apiLink}/WaiterList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataTable = async () => {
  try {
    const response = await fetch(`${apiLink}/TableList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataKitchenList = async () => {
  try {
    const response = await fetch(`${apiLink}/KitchenOrderList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataPendingOrderList = async () => {
  try {
    const response = await fetch(`${apiLink}/PendingOrderList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export const fetchDataDiningOrderList = async () => {
  try {
    const response = await fetch(`${apiLink}/DiningOrderList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log(response, "response");

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
export const fetchDataTakeAwayOrderList = async () => {
  try {
    const response = await fetch(`${apiLink}/TakeAwayOrderList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log(response, "takeaway");

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
export const fetchDataCarOrderList = async () => {
  try {
    const response = await fetch(`${apiLink}/CarOrderList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDataDiliveryOrderList = async () => {
  try {
    const response = await fetch(`${apiLink}/DiliveryOrderList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
