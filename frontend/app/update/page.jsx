'use client';

const Page = () => {
    
    const handleForm = async (formData) => {
        "use server";
        console.log(formData)
        const username = formData.get("username")
        console.log("Hello", username);
    };
  return (
    <div>
    <from action ={handleForm}>
        <input type = "text" name = "username" />
        <buttton>Send</buttton>
    </from>
      
    </div>
  );
};

export default Page;
