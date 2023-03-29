import { useRouter } from "next/router"

import { Shortcat } from "@prisma/client";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import Joi from 'joi'
import { addScheme } from "@/utilities/addScheme";

const schema = Joi.object({
  redirect_url: Joi.string().uri().custom((value) => {
    const pattern = /^http(s)?:\/\//i;
    if (!pattern.test(value)) {
      return "https://" + value;
    }
    return value;
  }).required().messages({
    'string.base': 'Redirect URL must be a string',
    'string.uri': 'Redirect URL must be a valid URL. Try adding `https://`',
    'any.required': 'Redirect URL is required',
  }),
});


const GuidPage = () => {
  const router = useRouter()
  const [errorMessages, setErrorMessages] = useState<string[]>()

  const [formData, setFormData] = useState<Pick<Shortcat, 'redirect_url'>>({
    redirect_url: ''
  });

  const apiUrl = `/api/v1/codes`

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (formData.redirect_url) {
        formData.redirect_url = addScheme(formData.redirect_url)
      }

      const validationResult = schema.validate(formData, { abortEarly: false });
      if (validationResult.error) {
        setErrorMessages(validationResult.error.details.map((error) => error.message));
        return;
      }

      const savedShortcat = await fetch(apiUrl, {
        method: "POST", headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (savedShortcat) {
        router.replace('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Card>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="redirectUrl">Redirect Url</Label>
        </div>
        <TextInput
          id="redirectUrl"
          name="redirect_url"
          type="text"
          value={formData.redirect_url}
          required={true}
          onChange={handleChange}
        />
        {errorMessages && <div className="mt-2 pt-2">
          <hr className="p-2" />
          Please fix the following errors.
          {errorMessages.map((error) => (
            <div key={error} className="text-red-500"> - {error}</div>
          ))}
        </div>
        }
      </div>
      <Button type="submit">Add New Redirect Url</Button>
    </form>
  </Card >
}

export default GuidPage