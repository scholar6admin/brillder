
import React from 'react'
import { Grid } from '@material-ui/core';

import './Text.scss'
import DocumentCKEditor from 'components/baseComponents/DocumentEditor';


export interface TextComponentProps {
  locked: boolean
  index: number
  data: any
  updateComponent(component: any, index: number): void
}

const TextComponent: React.FC<TextComponentProps> = ({locked, index, data, updateComponent}) => {
  const onChange = (htmlString: string) => {
    let comp = Object.assign({}, data);
    comp.value = htmlString;
    updateComponent(comp, index);
  }

  return (
    <div className="question-build-text-editor">
      <div className="text-label-container">
        <Grid className="text-label" container justify="center" alignContent="center">
          Text
        </Grid>
      </div>
      <DocumentCKEditor data={data.value} placeholder="" onChange={onChange} />
    </div>
  );
}

export default TextComponent
