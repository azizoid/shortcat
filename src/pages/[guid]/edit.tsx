import { useRouter } from "next/router"
import useSWR from 'swr'

import { Shortcat } from "@prisma/client";
import { fetcher } from "@/utilities/fetcher";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import Joi from 'joi'
import { activeValidation, redirectUrlValidation, shortcodeGuidValidation } from "@/utilities/validationRules";

const schema = Joi.object({
  id: Joi.number(),
  shortcode_guid: shortcodeGuidValidation,
  redirect_url: redirectUrlValidation,
  active: activeValidation
});


const GuidPage = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>()
  const router = useRouter()
  const { guid } = router.query

  const [formData, setFormData] = useState<Omit<Shortcat, 'id'>>({
    shortcode_guid: '',
    redirect_url: '',
    active: false,
  });

  const apiUrl = `/api/v1/codes/${guid}`

  const { data, error } = useSWR<Shortcat>(guid ? apiUrl : null, fetcher)

  useEffect(() => {
    if (data) {
      setFormData({ ...data })
    }
  }, [data])

  useEffect(() => { console.log(formData) }, [formData])

  if (!data || error) return <>Loading...</>;

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
      const validationResult = schema.validate(formData, { abortEarly: false });
      if (validationResult.error) {
        setErrorMessages(validationResult.error.details.map((error) => error.message));
        return;
      }

      const savedShortcat = await fetch(apiUrl, {
        method: "PATCH", headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (savedShortcat)
        router.replace('/')
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this data?');

    if (confirmed) {
      try {
        const response = await fetch(apiUrl, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete data');
        }

        router.replace('/')
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <Card>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="shortcatGuid">GUID</Label>
        </div>
        <TextInput
          id="shortcatGuid"
          type="text"
          name="shortcat_guid"
          value={data.shortcode_guid}
          required={true}
          disabled
        />
      </div>
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
        {errorMessages && errorMessages.map((error) => (
          <div key={error} className="text-danger">{error}</div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Label
          htmlFor="active"
          value="Active"
        />
        <Checkbox id="active" name="active" onChange={handleChange} checked={formData.active} />
      </div>
      <Button type="submit">Save Changes</Button>

      <Button type="button" size="xs" outline={true} color="failure" onClick={handleDelete}>
        Remove the URL
      </Button>
    </form>
  </Card>
}

export default GuidPage