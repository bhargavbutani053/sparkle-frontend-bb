import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ApiGetNoAuth, ApiPostNoAuth } from '../../Helpers/Api/ApiData';
import './SparkleStory.scss';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import './SparkleStoryImageCropper.scss';


export default function SparkleStory() {

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [formValues, setFormValues] = useState({})
    const [storyFile, setStoryFile] = useState()
    const [tnCCheck, setTnCCheck] = useState(false)
    const [formError, setFormError] = useState({})
    const [isCropDiv, setIsCropDiv] = useState(false)
    const [show, setIsshow] = useState(false)
    const [cropper, setCropper] = useState();
    const [cropImage, setCropImage] = useState();
    const [showForm, setShowForm] = useState(true)


    const handleInputChange = (e) => {
        setFormValues((prevValue) => {
            return { ...prevValue, [e.target.name]: e.target.value }
        })
        setFormError((prevValue) => {
            return { ...prevValue, [e.target.name]: "" }
        })
    }

    function validateSize(file) {
      const fileSize = file.size / 1024 / 1024; // in MiB
      if (fileSize > 25) {
          console.log("in if", fileSize)
          return false;
        } else {
          console.log("in else", fileSize)
        return true;
      }
    }

    const handleFileUpload = (e) => {
        e.preventDefault()
        let file = e.target?.files
            ? e.target?.files[0]
            : e.dataTransfer?.files
                ? e.dataTransfer?.files[0]
                : null

        if (file?.type?.includes("image")) {
            setStoryFile(file)
            setFormError((prevValue) => {
                return { ...prevValue, storyFile: "" }
            })

            const reader = new FileReader();
            reader.onload = () => {
                setCropImage(reader.result);
            };
            reader.readAsDataURL(file);
            setIsCropDiv(true)

        } else if (file?.type?.includes("video")) {
            console.log("fileeee", file)
            if(validateSize(file)){
                setStoryFile(file)
                setFormError((prevValue) => {
                    return { ...prevValue, storyFile: "" }
                })
            } else {
                toast.error("Video size should be less than 25MB");
                setFormError((prevValue) => {
                    return { ...prevValue, storyFile: "Video size should be less than 25MB" }
                })
            }

        } else {
            setFormError((prevValue) => {
                return { ...prevValue, storyFile: "Please Upload Only Image or Video File" }
            })
        }
    }

    const handleCropImage = () => {
        if (typeof cropper !== "undefined") {
            fetch(cropper.getCroppedCanvas().toDataURL())
                .then(res => res.blob())
                .then(blob => {
                    blob.name = storyFile?.name
                    blob.lastModified = new Date().getTime()
                    setStoryFile(blob)
                })
            setIsCropDiv(false)
        }
    };

    const handleCropCancel = () => {
        setIsCropDiv(false)
        setCropImage()
    }

    const handleTnC = (e) => {
        setTnCCheck(e.target.checked)
        setFormError((prevValue) => {
            return { ...prevValue, tnc: "" }
        })
    }

  

    const isFormValid = () => {
        let isValid = true
        // eslint-disable-next-line
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        // generate regex for not accept only numeric, only symbols or only spaces
        const nameRegx = /^[a-zA-Z]{2,30}$/

        if (!formValues?.firstname || formValues?.firstname === "" || !nameRegx.test(formValues?.firstname)) {
            setFormError((prevValue) => {
                return { ...prevValue, firstname: "Please Enter Your First Name Properly" }
            })
            isValid = false
        }
        if (!formValues?.lastname || formValues?.lastname === "" || !nameRegx.test(formValues?.lastname)) {
            setFormError((prevValue) => {
                return { ...prevValue, lastname: "Please Enter Your Last Name Properly" }
            })
            isValid = false
        }
        if (formValues?.email && !formValues?.email?.match(emailRegEx)) {
            setFormError((prevValue) => {
                return { ...prevValue, email: "Please Enter Valid Email" }
            })
            isValid = false
        }
        if (!formValues?.email || formValues?.email === "") {
            setFormError((prevValue) => {
                return { ...prevValue, email: "Please Enter Email" }
            })
            isValid = false
        }
        if (!formValues?.story || formValues?.story === "") {
            setFormError((prevValue) => {
                return { ...prevValue, story: "Please Enter Story" }
            })
            isValid = false
        }
        // if (
        //   !storyFile?.type?.includes("image") &&
        //   !storyFile?.type?.includes("video")
        // ) {
        //   setFormError((prevValue) => {
        //     return {
        //       ...prevValue,
        //       storyFile: "Please Upload Only Image or Video File",
        //     };
        //   });
        //   isValid = false;
        // }
        // if (!storyFile) {
        //     setFormError((prevValue) => {
        //         return { ...prevValue, storyFile: "Please Upload Image" }
        //     })
        //     isValid = false
        // }
        if (!tnCCheck) {
            setFormError((prevValue) => {
                return { ...prevValue, tnc: "Please Accept Terms & Condotions" }
            })
            isValid = false
        }
        return isValid
    }

    

    const handleStoryFormSubmit = (e) => {
        e.preventDefault()
        if (!isFormValid()) {
            return
        } else {
            let formData = new FormData()
            for (let i in formValues) {
                formData.append(i, formValues[i])
            }
            formData.append("image", storyFile)

            for (let i of formData.entries()) {
                console.log(i[0], i[1]);
            }

            postStoryFormData(formData)
                .then((res) => {
                    if (res.message) {
                        toast.success(res.message, {
                            position: "top-right",
                            autoClose: 5000,
                        });
                        setFormValues({})
                        setStoryFile()
                        setTnCCheck(false)
                        setLoading(false)
                        setShowForm(false)
                    }
                }).catch((err) => {
                    toast.error("Something Went Wrong, Please Try Again Later", {
                        position: "top-right",
                        autoClose: 5000,
                    });
                    setLoading(false)
                })
        }
    }

    const postStoryFormData = async (formData) => {
        setLoading(true)
        let res = await ApiPostNoAuth("story/createstory", formData)
        return res?.data;
    }

    const maxLengthCheck = (e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        }
    }

    return (
        <>
            {loading &&
                <div className="loader-div">
                    <h1>Loading...</h1>
                </div>
            }
            {
                isCropDiv &&
                <div className="img-crop-div">
                    <div className="img-cropper">
                        <Cropper
                            src={cropImage}
                            style={{ maxWidth: "90%", maxHeight: "75vh" }}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            aspectRatio={1 / 1}
                        />
                    </div>

                    <div className="crop-div-btns">
                        <button className="btn-crop" onClick={handleCropImage}>Crop & Save</button>
                        <button className="btn-cancel" onClick={handleCropCancel}>Cancel</button>
                    </div>
                </div>
            }

            <div className="sparkle-story-banner" id="formBar">
                <div className="container">
                    <div className="sparkle-text">
                        <h1>TELL US YOUR<br /> SPARKLE STORY</h1>
                        <p>Please use the form below to enter your information.</p>
                    </div>
                    <div className="grid">
                        <div className="grid-items">
                            {
                                showForm ?
                            (<form className="form-box" onSubmit={handleStoryFormSubmit}>
                                <div className="form-grid">
                                    <div className="form-grid-items">
                                        <label htmlFor="firstname">First Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            placeholder="Enter Your First Name"
                                            value={formValues?.firstname || ""}
                                            onChange={handleInputChange}
                                            maxLength="30"
                                            onInput={(e) => maxLengthCheck(e)}
                                        />
                                        <p className="error-msg">
                                            {formError?.firstname
                                                && formError?.firstname !== ""
                                                && formError?.firstname}
                                        </p>
                                    </div>

                                    <div className="form-grid-items">
                                        <label htmlFor="lastname">Last Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            placeholder="Enter Your First Name"
                                            value={formValues?.lastname || ""}
                                            onChange={handleInputChange}
                                            maxLength="30"
                                            onInput={(e) => maxLengthCheck(e)}
                                        />
                                        <p className="error-msg">
                                            {formError?.lastname
                                                && formError?.lastname !== ""
                                                && formError?.lastname}
                                        </p>
                                    </div>
                                </div>

                                <div className="form-grid margin-top">
                                    <div className="form-grid-items" style={{
                                        gridColumn: "1/3",
                                    }}>
                                        <label htmlFor="email">Email <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            placeholder="Enter Your Email"
                                            value={formValues?.email || ""}
                                            onChange={handleInputChange}
                                        />
                                        <p className="error-msg">
                                            {formError?.email
                                                && formError?.email !== ""
                                                && formError?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="form-grid-items-text-area">
                                    <label htmlFor="story">Your SPARKLE Story <span className="required">*</span></label>
                                    <textarea
                                        id="story"
                                        name="story"
                                        placeholder="Enter Your SPARKLE Story Here…"
                                        rows="4"
                                        cols="50"
                                        value={formValues?.story || ""}
                                        onChange={handleInputChange}
                                        maxLength="400"
                                        onInput={(e) => maxLengthCheck(e)}
                                    ></textarea>
                                    <p className="error-msg">
                                        {formError?.story
                                            && formError?.story !== ""
                                            && formError?.story}
                                    </p>
                                </div>

                                <label
                                    htmlFor="storyFile"
                                    onDrop={handleFileUpload}
                                    onDragOver={(e) => e.preventDefault()}
                                    className="darg-box-img"
                                >
                                    <p>Drag and drop file here or
                                        <span> browse</span> from computer
                                        <span className="file-name">{storyFile?.name}</span>
                                        <input
                                            type="file"
                                            accept="image/*, video/*"
                                            id="storyFile"
                                            className="file-input"
                                            name="storyFile"
                                            onChange={handleFileUpload}
                                        />
                                    </p>
                                </label>
                                <p className="error-msg">
                                    {formError?.storyFile
                                        && formError?.storyFile !== ""
                                        && formError?.storyFile}
                                </p>

                                <div className="terms-conditions">
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="tnc"
                                            name="tnc"
                                            checked={tnCCheck}
                                            onChange={handleTnC}
                                        />
                                        <label htmlFor="tnc">Please indicate that you have read and <span>agree to the Terms and Conditions.</span></label>
                                        {/* <label htmlFor="tnc">I agree to <span>Terms & Conditions,</span> and acknowledge that by submitting my photo/video that I release its use in the Sparkle Story.</label> */}
                                    </div>
                                    <p className="error-msg">
                                        {formError?.tnc
                                            && formError?.tnc !== ""
                                            && formError?.tnc}
                                    </p>
                                </div>

                                <div className="submit-button">
                                    <button type="submit">SUBMIT</button>
                                </div>
                            </form>) 
                            : (
                                <div>
                                  <div className="final-register-box">
                                        <div className="text-style">
                                            <h1>THANK YOU FOR SUBMITTING YOUR SPARKLE STORY!</h1>
                                            <p>
                                            Your Sparkle Story has been submitted. Check back here soon to see it in the gallery. In the meantime, browse other stories from Sparkling Ice fans. 
                                            </p>
                                            <center>OR</center>
                                            <h6 onClick={()=> setShowForm(true)}>Submit Another Sparkle Story</h6>
                                        </div>
                                  </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
