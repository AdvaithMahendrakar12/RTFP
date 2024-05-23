import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <LocalShippingIcon className="h-8 w-8" />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheckIcon className="h-8 w-8" />,
    },
    {
      label: "Payment",
      icon: <AccountBalanceIcon className="h-8 w-8" />,
    },
  ];

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} className="bg-gray-100 p-4 rounded-lg">
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index}
            completed={activeStep > index}
          >
            <StepLabel
              StepIconComponent={({ completed, active }) =>
                item.icon
              }
              className={activeStep >= index ? "text-red-500" : "text-gray-600"}
            >
              <Typography>{item.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
