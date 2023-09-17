import React, {useState} from "react";
import {redirect, Link} from "react-router-dom";

// GraphQL imports
import {useMutation} from "@apollo/client";
import {CREATE_EMPLOYER} from "../../utils/mutations";

// Helpers & Utils
import {trimObjectValues} from "../../utils/helpers";
import Auth from "../../utils/auth";
import "../../pages/styles/login.css";

const CreateEmployer = () => {
  // States for form data to be used and saved.
  const [userFormData, setUserFormData] = useState({
    email: null,
    password: null,
    passwordConfirm: null,
    companyName: null,
  });
  const [errorData, setErrorData] = useState({error: ""});

  // Create mutation
  const [createEmployer, {error}] = useMutation(CREATE_EMPLOYER);

  // Handles for change input
  const handleInputChange = (event) => {
    // Deconstruct the target with what has changed as name and the value as well value.
    const {name, value} = event.target;

    // Set the change in form data on the change in name and value.
    setUserFormData({...userFormData, [name]: value});
  };

  // Handles form submit action
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // TrimHelper takes all values to remove any whitespace.
    const userInput = await trimObjectValues(userFormData);

    // Error Handling
    if (!userFormData.email) {
      setErrorData({...errorData, error: "You must enter an email!"});
      return;
    }

    if (!userFormData.password) {
      setErrorData({...errorData, error: "You must enter a password!"});
      return;
    }

    if (!userFormData.companyName) {
      setErrorData({...errorData, error: "Enter your company name!"});
      return;
    }

    // Checks passwords match
    if (userFormData.password !== userFormData.passwordConfirm) {
      setErrorData({...errorData, error: "Your passwords must match!"});
      return;
    }

    delete userInput.passwordConfirm;

    try {
      // Request to server to create user, returns auth and user as data.
      const {data} = await createEmployer({
        variables: {userData: userInput},
      });

      console.log(data);

      Auth.login(data.createEmployer.token);

      return redirect("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <h2>Register as a Company</h2>
      <form onSubmit={handleFormSubmit}>
        {error && <span>{error.graphQLErrors[0].message}</span>}
        <span>&nbsp;{errorData.error || ""}&nbsp;</span>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={userFormData.email || ""}
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={userFormData.password || ""}
            placeholder="Password"
            onChange={handleInputChange}
            title="Password. Your password must follow the required pattern"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,40}$"
            onInvalid={() =>
              setErrorData({
                error:
                  "Password must have at least 1 digit, 1 upper and lower case character and one of the following symbols !,@,#,$,%,^,&,*. Can be no fewer than 8 characters and no more than 40.",
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="passwordConfirm"
            value={userFormData.passwordConfirm || ""}
            placeholder="Password Confirm"
            onChange={handleInputChange}
            title="Password. Your password must follow the required pattern"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,40}$"
            onInvalid={() =>
              setErrorData({
                error:
                  "Password must have at least 1 digit, 1 upper and lower case character and one of the following symbols !,@,#,$,%,^,&,*. Can be no fewer than 8 characters and no more than 40.",
              })
            }
          />
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="password">Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={userFormData.companyName || ""}
              placeholder="Company Name"
              pattern="^\S+$"
              title="Name&#39;s cannot contain spaces"
              onChange={handleInputChange}
              onInvalid={() =>
                setErrorData({error: "Name's cannot contain spaces"})
              }
            />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
      <button className="button">
        <Link className="link" to="/login">
          Already have an account? Login here.
        </Link>  
      </button>
    </div>
  );
};

export default CreateEmployer;
