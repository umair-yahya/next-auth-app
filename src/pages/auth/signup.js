import Form from "@/components/auth/form";

export default function SignUp() {
  const onSubmit = async (email, password) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        alert("Sign-Up Successfull");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return <Form signin={false} onFormSubmit={onSubmit} />;
}
