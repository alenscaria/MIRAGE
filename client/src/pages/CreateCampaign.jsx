import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStorageUpload } from '@thirdweb-dev/react'
import { useStateContext } from '../context';
import { warning } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';


const CreateCampaign = () => {

  const [file, setFile] = useState();
  const { mutateAsync: upload } = useStorageUpload();
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadUrlConf, setUploadUrlConf] = useState("");
  const uploadToIpfs = async() => {
    const result = await upload({
      data: [file],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true
      }
    });
    console.log("Upload Url:",result)
    setUploadUrl(result);
  };

  const uploadToIpfsConf = async() => {
    const secret = await upload({
      data: [file],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true
      }
    });
    console.log("Upload Url:",secret)
    setUploadUrlConf(secret);
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className="bg-[#f3f3f9] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-[#0e2238]">Create new Shipment</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Sender Address *"
            placeholder="Enter Sender's Wallet Address"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Receiver Address *"
            placeholder="Enter Receiver's Wallet Address"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>



        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Logistic Address *"
            placeholder="Enter Logistic's Wallet Address"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="Start Date *"
            placeholder="Start Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Description *"
            placeholder="Write your Description"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />


<label for="formFileMultiple" class="form-label">Common Document(s) *</label>
<input class="form-control" type="file" id="formFileMultiple" multiple 
  onChange={(e) => {
    if(e.target.files){
      setFile(e.target.files[0])
    }
  }}
/>
<CustomButton
btnType="button"
title="upload"
styles="bg-[#1dc071] w-2/5"
handleClick={uploadToIpfs}
/>
<div>
  <h4 className='font-epilogue font-semibold text-black text-[18px]'>Upload Url:</h4>
  <a 
  href={uploadUrl}
  className="font-epilogue font-normal text-[#278bdc] text-[15px]"
  >
    {uploadUrl}
  </a>
</div>


<label for="formFileMultiple" class="form-label">Confidential Document(s) *</label>
<input class="form-control" type="file" id="formFileMultiple" multiple 
  onChange={(e) => {
    if(e.target.files){
      setFile(e.target.files[0])
    }
  }}
  />
  <CustomButton
btnType="button"
title="upload"
styles="bg-[#1dc071] w-2/5"
handleClick={uploadToIpfsConf}
/>
<div>
  <h4 className='font-epilogue font-semibold text-black text-[18px]'>Upload Url:</h4>
  <a 
  href={uploadUrlConf}
  className="font-epilogue font-normal text-[#278bdc] text-[15px]"
  >
    {uploadUrlConf}
  </a>
</div>

          <FormField 
            labelName="Image"
            placeholder="Place package image URL of your shipment"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

<div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={warning} alt="warning" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">Check entered details are correct or not. Once Submitted, it cannot be modified!</h4>
        </div>


          
          

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new shipment"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign