
import React from "react";
import { Grid } from "@material-ui/core";

import ExitButton from '../../components/ExitButton';
import './brickLength.scss';
import NextButton from '../../components/nextButton';
import PreviousButton from '../../components/previousButton';
import { ProposalStep } from "../../model";
import PhonePreview from "components/build/baseComponents/phonePreview/PhonePreview";


export enum BrickLengthEnum {
  None = 0,
  S20min = 20,
  S40min = 40,
  S60min = 60
}

const BrickLengthPreviewComponent:React.FC<any> = ({data}) => {
  return (
    <Grid container justify="center" className="phone-preview-component">
      <img alt="head" src="/images/new-brick/brick-length.png"></img>
      <div>{data === 0 ? "?" : data}</div>
    </Grid>
  )
}

function BrickLength({ length, saveBrick }: any) {
  let presectedLength = 0;
  if (length === 20) {
    presectedLength = BrickLengthEnum.S20min;
  } else if (length === 40) {
    presectedLength = BrickLengthEnum.S40min;
  } else if (length === 60) {
    presectedLength = BrickLengthEnum.S60min;
  }
  const [brickLength, setLength] = React.useState(presectedLength as BrickLengthEnum);

  const setBrickLength = (brickLength: BrickLengthEnum) => {
    setLength(brickLength);
  }

  return (
    <div className="tutorial-page brick-length-page">
      <ExitButton />
      <Grid container direction="row" style={{ height: '100%' }} alignItems="center">
        <Grid container justify="center" item xs={12} md={8} lg={8}>
          <Grid justify="center" container item xs={12} sm={9} md={8} lg={7}>
            <div className="left-card">
              <h1 className="only-tutorial-header-length">
                <p>20 minute are a taster. 60 minutes are a feast.</p>
                <p>You can always shorten or extend later.</p>
              </h1>
              <h2 className="length-description">Choose Brick Length.</h2>
              <Grid container direction="row">
                <Grid container item xs={4} className="brick-length-image-container brick-length-image-container1">
                  <div
                    className={"brick-length-image brick-length-20-image " + ((brickLength === BrickLengthEnum.S20min) ? "active" : "")}
                    onClick={() => setBrickLength(BrickLengthEnum.S20min)}></div>
                  <Grid container direction="row" justify="center" className="bottom-time-description">
                    20
                  </Grid>
                </Grid>
                <Grid container item xs={4} className="brick-length-image-container brick-length-image-container2">
                  <div
                    className={"brick-length-image brick-length-40-image " + ((brickLength === BrickLengthEnum.S40min) ? "active" : "")}
                    onClick={() => setBrickLength(BrickLengthEnum.S40min)}></div>
                  <Grid container direction="row" justify="center" className="bottom-time-description">
                    40
                </Grid>
                </Grid>
                <Grid container item xs={4} className="brick-length-image-container brick-length-image-container3">
                  <div
                    className={"brick-length-image brick-length-60-image " + ((brickLength === BrickLengthEnum.S60min) ? "active" : "")}
                    onClick={() => setBrickLength(BrickLengthEnum.S60min)}></div>
                  <Grid container direction="row" justify="center" className="bottom-time-description">
                    60
                  </Grid>
                </Grid>
              </Grid>
              <PreviousButton to="/build/new-brick/prep" />
              <NextButton
                step={ProposalStep.BrickLength}
                canSubmit={brickLength !== BrickLengthEnum.None}
                onSubmit={saveBrick}
                data={brickLength} />
            </div>
          </Grid>
        </Grid>
        <PhonePreview Component={BrickLengthPreviewComponent} data={brickLength} />
      </Grid>
    </div>
  );
}

export default BrickLength