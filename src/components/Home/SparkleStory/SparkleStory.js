import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ApiGetNoAuth, ApiPostNoAuth } from '../../Helpers/Api/ApiData';
import './SparkleStory.scss';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import './SparkleStoryImageCropper.scss';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';



const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });



  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
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


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  


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

    const   handleFileUpload = (e) => {
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
            fetch(cropper.getCroppedCanvas({
                width: 960
              }).toDataURL("image/jpeg",0.9))
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
        //  setOpen(false);
    }

  

    const isFormValid = () => {
        let isValid = true
        // eslint-disable-next-line
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        // generate regex for not accept only numeric, only symbols or only spaces
        const nameRegx = /^[a-zA-Z]{2,30}$/

        if (!formValues?.firstname || formValues?.firstname === "" || !nameRegx.test(formValues?.firstname)) {
            setFormError((prevValue) => {
                return { ...prevValue, firstname: "Please enter your first name." }
            })
            isValid = false
        }
        if (!formValues?.lastname || formValues?.lastname === "" || !nameRegx.test(formValues?.firstname)) {
          formValues["lastname"] = null;
            isValid = true
        }
     
        if (formValues?.email && !formValues?.email?.match(emailRegEx)) {
            setFormError((prevValue) => {
                return { ...prevValue, email: "Please enter your email address." }
            })
            isValid = false
        }
        if (!formValues?.email || formValues?.email === "") {
            setFormError((prevValue) => {
                return { ...prevValue, email: "Please enter your email address." }
            })
            isValid = false
        }
        if (!formValues?.story || formValues?.story === "") {
            setFormError((prevValue) => {
                return { ...prevValue, story: "Your Sparkle Story Tell us why Sparkling Ice matters to you." }
            })
            isValid = false
        }
        // if (!storyFile) {
        //     setFormError((prevValue) => {
        //         return { ...prevValue, storyFile: "Please Upload Image" }
        //     })
        //     isValid = false
        // }
        if (!tnCCheck) {
            setFormError((prevValue) => {
                return { ...prevValue, tnc: "Please Accept Terms & Conditions" }
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
            if (
                storyFile?.type?.includes("image")
              ) {
                formData.append("type", "image")
                
              } else if(storyFile?.type?.includes("video")){
                formData.append("type", "video")
                 
              } else {
                formData.append("type", "defaultImage")
                  
              }

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
                        window.location.href = "#thankYou";
                        setFormValues({})
                        setStoryFile()
                        setTnCCheck(false)
                        setLoading(false)
                        setShowForm(false)
                        setFormError();
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
                            viewMode={1}
                            checkOrientation={false}
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
                    <h1>TELL US YOUR</h1><br /> <h1>SPARKLE STORY</h1>
                </div>
                <div className="sparkle-text" id="thankYou">
                    <p>Please complete the form below to share your sparkle story.</p>
                </div>
                <div className="box-center-alignment">
                    <div className="grid">
                        <div className="grid-items" >
                            {
                                !showForm ?
                            (<form className="form-box" onSubmit={handleStoryFormSubmit}>
                                <div className="form-grid">
                                    <div className="form-grid-items">
                                        <label htmlFor="firstname">First Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            placeholder="Please enter your first name."
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
                                        <label htmlFor="lastname">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            placeholder="Please enter your last name."
                                            value={formValues?.lastname || ""}
                                            onChange={handleInputChange}
                                            maxLength="30"
                                            onInput={(e) => maxLengthCheck(e)}
                                        />
                                       
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
                                            placeholder="Please enter your email address."
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
                                    <label htmlFor="story">Your Sparkle Story <span className="required">*</span></label>
                                    <textarea
                                        id="story"
                                        name="story"
                                        placeholder="Your Sparkle Story Tell us why Sparkling Ice matters to you.
                                        "
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
                                    <p>Drag files here to upload your image, or 
                                        <span> browse</span> from your computer.
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
                                    <div className="terms-grid-align">
                                        <input
                                            className="checkbox"
                                            type="checkbox"
                                            id="tnc"
                                            name="tnc"
                                            checked={tnCCheck}
                                            onChange={handleTnC}
                                           
                                           
                                        />
                                        {/* <label htmlFor="tnc" onClick={handleClickOpen}>Please indicate that you have read and <span onClick={handleClickOpen}>agree to the Terms and Conditions.</span></label> */}
                                        <p htmlFor="tnc">I agree to the <span onClick={handleClickOpen} className="terams">Terms & Conditions,</span> and consent to my Sparkle <br/> Story and image being added to the Sparkle Gallery.</p>
                                    </div>
                                    
                                </div>
                                <p className="error-msg message-center-align">
                                        {formError?.tnc
                                            && formError?.tnc !== ""
                                            && formError?.tnc}
                                    </p>

                                <div className="submit-button">
                                    <button type="submit">SUBMIT</button>
                                </div>
                            </form>) 
                            : (
                                <div id="">
                                  <div className="final-register-box">
                                        <div className="text-style">
                                            <h1>THANK YOU FOR SUBMITTING<br/> YOUR SPARKLE STORY!</h1>
                                            <p>Your Sparkle Story has been submitted.</p>
                                            <p>Check back here soon too see it in the gallery.</p>
                                            <div className="child-text-align">
                                                <p>
                                                Want to get rewarded for your love of Sparkling Ice? Join<br/> Sparkling Ice Rewards to earn perks 
                                                like a chance to win a<br/> year's supply of Sparkling Ice!  
                                                </p>
                                            </div>
                                           <div className="join-button">
                                           <a href="https://bit.ly/SIRewards" target="_blank"><button onClick={()=> setShowForm(true)}>JOIN NOW</button></a>
                                            </div>
                                        </div>
                                  </div>
                                </div>
                            )}

                        </div>
                    </div>
                    </div>
                </div>
            </div>



            <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Terms & Conditions
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          Except where prohibited by law, by submitting your “Sparkle Story” you grant to Talking Rain Beverage Company, 
          Inc. website administrator, and all of their respective partners, parent companies, divisions, subsidiaries, affiliates, trustees, franchisees, licensees, distributors, prize providers, advertising, promotion,
           and public relations agencies and those acting pursuant to Talking Rain and administrator’s authority, the right and permission to print, publish, 
           
          </Typography>
          <Typography gutterBottom>
          broadcast, and use, worldwide, in any media now known or hereafter developed,
            including but not limited to the world wide web, at any time or times, your Sparkle Story,
             in whole or in part, the name or personal identifying information you provide with your submission, 
            
          </Typography>
          <Typography gutterBottom>
          which may include pictures, voice, likeness, and biographical information (the “Submission”) for advertising, trade, and promotional purposes without consideration, compensation, permission, or further notification.
              You agree that Talking Rain shall own the Submission, which will not be acknowledged or returned, and that Talking Rain and its designees shall have the perpetual, 
              worldwide right to edit, publish, and use the Submission in any way and in any media for trade, advertising, promotional, and/or other purposes as Talking Rain and/or its designees may determine. 
          </Typography>
        </DialogContent>
        <DialogActions>
            {/* <Button autoFocus onClick={handleClose} color="primary">
                Agree
            </Button> */}
        </DialogActions>
      </Dialog>
    </div>
        </>
    )
}
