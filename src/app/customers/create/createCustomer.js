"use server";
import { revalidatePath } from "next/cache";

const createCustomer = async (formData) => {
  const creating_customer_name = formData.get("customer_name");
  const creating_customer_id = formData.get("customer_id");
  const creating_age = formData.get("age");
  const creating_gender = formData.get("gender");



  const body_msg = JSON.stringify({
    customer_name: creating_customer_name,
    customer_id: creating_customer_id,
    age: creating_age,
    gender: creating_gender,
  });

   // 必須項目の検証
    if (!creating_customer_id) {
    throw new Error("IDを入力してください");
    }

    //if (!formData.get("customer_id"))  {
      //setErrorMessage("userIDを入力してください。");
      //return;
    //}

  const res = await fetch(`http://localhost:8000/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body_msg,
  });
  if (!res.ok) {
    throw new Error("Failed to create customer");
  }

  revalidatePath(`/customers`);
};

export default createCustomer;
