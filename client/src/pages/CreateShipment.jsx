import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStorageUpload } from '@thirdweb-dev/react'
import { useStateContext } from '../context';
import { warning } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import "./style.css"

const CreateShipment = () => {

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
  const { createShipment } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    category: '',
    sender: '',
    logistics: '',
    receiver: '',
    description: '',
    commonDocuments: '',
    confidentialDocuments: '',
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
        // calling createShipment error.... target was deleted, check alternative.
        await createShipment({ ...form})

        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
    console.log(form);
  }

  return (
    <div className="glassform flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-[#ffffff]">Create New Shipment</h1>
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
            value={form.receiver}
            handleChange={(e) => handleFormFieldChange('receiver', e)}
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
          labelName="Category *"
          placeholder="Mention the category"
          inputType="text"
          value={form.category}
          handleChange={(e) => handleFormFieldChange('category', e)}
        />
        </div>

        <FormField 
        labelName="Title *"
        placeholder="Enter Title"
        inputType="text"
        value={form.title}
        handleChange={(e) => handleFormFieldChange('title', e)}
      />

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
          styles="bg-[#1dc071] w-2/5 hover:bg-[#0e2238]"
          handleClick={uploadToIpfs}
          />
          <div>
            {/* Ipfs uploaded link */}
            
              <FormField 
                labelName="IPFS Url: "
                placeholder="Copy and paste the link given below"
                inputType="text"
                value={form.commonDocuments}
                handleChange={(e) => handleFormFieldChange('commonDocuments', e)}
              />
              {uploadUrl}
              <a 
              href={uploadUrl}
              >
                <div className='sm:w-1/5 w-[100px] px-4 py-2 bg-[#1dc071] font-epilogue text-white font-semibold text-[18px] rounded-[17px] justify-center items-center text-center mt-[10px] hover:bg-[#0e2238]'>
                  Link
                </div>
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
          styles="bg-[#1dc071] w-2/5 hover:bg-[#0e2238]"
          handleClick={uploadToIpfsConf}
          />
          <div>
            <FormField 
              labelName="IPFS Url: "
              placeholder="Copy and paste the link given below"
              inputType="text"
              value={form.confidentialDocuments}
              handleChange={(e) => handleFormFieldChange('confidentialDocuments', e)}
            />
            {uploadUrlConf}
            <a 
            href={uploadUrl}
            >
              <div className='sm:w-1/5 w-[100px] px-4 py-2 bg-[#1dc071] font-epilogue text-white font-semibold text-[18px] rounded-[17px] justify-center items-center text-center mt-[10px] hover:bg-[#0e2238]'>
                Link
              </div>
            </a>
          </div>
  

          <FormField 
            labelName="Image"
            placeholder="Place package image URL of your shipment"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

<div className="w-full flex justify-start items-center p-4 glasswarning h-[80px] rounded-[10px]">
          <img src={warning} alt="warning" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[20px] text-[#ffffff] ml-[20px]">Check entered details are correct or not. Once Submitted, it cannot be modified!</h4>
        </div>


          
          

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit"
              styles="glass-button"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateShipment