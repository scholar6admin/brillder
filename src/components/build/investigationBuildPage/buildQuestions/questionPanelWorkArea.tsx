import React from 'react'
import { Grid, Select, FormControl, Button } from '@material-ui/core';
import { MenuItem } from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ReactSortable } from "react-sortablejs";

import QuestionComponents from './questionComponents/questionComponents';
import {getNonEmptyComponent} from '../questionService/QuestionService';
import './questionPanelWorkArea.scss';
import { QuestionTypeEnum, QuestionComponentTypeEnum, Question, QuestionType } from '../../../../model/question';
import DragBox from './drag/dragBox';
import { HintState } from 'components/build/baseComponents/Hint/Hint';
import LockComponent from './lock/Lock';


function SplitByCapitalLetters(element: string): string {
  return element.split(/(?=[A-Z])/).join(" ");
}

export interface QuestionProps {
  brickId: number
  question: Question
  history: any
  questionsCount: number
  synthesis: string
  saveBrick(): void
  setQuestion(index: number, question: Question): void
  updateComponents(components: any[]): void
  setQuestionType(type: QuestionTypeEnum): void
  nextOrNewQuestion(): void
  getQuestionIndex(question: Question): number
  setPreviousQuestion(): void
  toggleLock(): void
  locked: boolean
}

const QuestionPanelWorkArea: React.FC<QuestionProps> = (
  { brickId, question, history, getQuestionIndex, locked, ...props }
) => {
  const [componentTypes, setComponentType] = React.useState([
    {id: 1, type: QuestionComponentTypeEnum.Text},
    {id: 2, type: QuestionComponentTypeEnum.Quote},
    {id: 3, type: QuestionComponentTypeEnum.Image},
    {id: 4, type: QuestionComponentTypeEnum.Sound},
    {id: 4, type: QuestionComponentTypeEnum.Graph}
  ]);
  const { type } = question;
  document.title = QuestionTypeEnum[type];

  const setQuestionHint = (hintState: HintState) => {
    if (locked) { return; }
    const index = getQuestionIndex(question);
    const updatedQuestion = Object.assign({}, question) as Question;
    updatedQuestion.hint.value = hintState.value;
    updatedQuestion.hint.list = hintState.list;
    updatedQuestion.hint.status = hintState.status;
    props.setQuestion(index, updatedQuestion);
  }

  let typeArray: string[] = Object.keys(QuestionType);
  let index = getQuestionIndex(question);

  let showHelpArrow = false;
  if (index === 0) {
    showHelpArrow = getNonEmptyComponent(question.components);
  }

  return (
    <MuiThemeProvider >
      <div className="build-question-page" style={{width: '100%', height: '94%'}}>
        {
          showHelpArrow ? <img alt="" className="help-arrow" src="/images/investigation-arrow.png" /> : ""
        }
        <Grid container justify="center" className="build-question-column" item xs={12}>
          <Grid container direction="row">
            <Grid container item xs={4} sm={3} md={3} alignItems="center" className="parent-left-sidebar">
              <Grid container item xs={12} className="left-sidebar" alignItems="center">
              
                <ReactSortable
                  list={componentTypes}
                  group={{ name: "cloning-group-name", pull: "clone" }}
                  setList={setComponentType} sort={false}
                >
                  <DragBox
                    locked={locked}
                    name="T" fontSize="3.4vw" label="T E X T"
                    hoverMarginTop="0.5vw"
                    fontFamily="Brandon Grotesque Bold"
                    value={QuestionComponentTypeEnum.Text}
                  />
                  <DragBox
                    locked={locked}
                    name="“ ”" fontSize="2.5vw" label="Q U O T E"
                    hoverMarginTop="-0.65vw"
                    fontFamily="Brandon Grotesque Bold"
                    letterSpacing="0.625vw"
                    marginLeft="0.3vw"
                    value={QuestionComponentTypeEnum.Quote}
                  />
                  <DragBox
                    locked={locked}
                    name="jpg." fontSize="2.5vw" label="I M A G E"
                    hoverMarginTop="1vw"
                    marginTop="-2.8vw"
                    fontFamily="Brandon Grotesque Bold"
                    value={QuestionComponentTypeEnum.Image}
                  />
                  <DragBox
                    locked={locked}
                    isImage={true} src="/images/soundicon.png"
                    label="S O U N D" 
                    hoverMarginTop="0.5vw"
                    fontFamily="Brandon Grotesque Bold"
                    value={QuestionComponentTypeEnum.Sound}
                  />
                </ReactSortable>
                <DragBox
                  locked={true}
                  name="f(x)" fontSize="2.5vw" label="G R A P H"
                  fontFamily="Brandon Grotesque Bold Italic"
                  hoverMarginTop="0.9vw"
                  marginTop="-1vw"
                  value={QuestionComponentTypeEnum.Graph}
                />
              </Grid>
            </Grid>
            <Grid container item xs={5} sm={6} md={6} className="question-components-list">
              <QuestionComponents
                questionIndex={index}
                locked={locked}
                brickId={brickId}
                history={history}
                question={question}
                updateComponents={props.updateComponents}
                setQuestionHint={setQuestionHint} />
            </Grid>
            <Grid container item xs={3} sm={3} md={3} className="right-sidebar">
              <Grid container direction="row" justify="center">
                <Grid container item xs={11} className="question-button-container" justify="center">
                  {
                    (index >= 1) ?
                      <Grid container justify="center" alignContent="flex-start">
                        <div className="right-side-text">Last Question?</div>
                        <Button
                          className="synthesis-button"
                          onClick={() => history.push(`/build/brick/${brickId}/build/investigation/synthesis`)}
                        >
                          <img alt="add-synthesis" src="/images/synthesis-icon.png" className="inner-icon" />
                          {
                            props.synthesis ? 'Edit Synthesis' : 'Add Synthesis'
                          }
                        </Button>
                      </Grid>
                    : ""
                  }
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center">
                <Grid container justify="center" item sm={12}>
                  <FormControl variant="outlined">
                    <Select
                      className="select-question-type"
                      disabled={locked}
                      value={type}
                      inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                      }}
                      onChange={(e) => {
                        props.setQuestionType(parseInt(e.target.value as string) as QuestionTypeEnum);
                      }}
                    >
                      {
                        typeArray.map((typeName, i) => {
                          const type = QuestionType[typeName] as QuestionTypeEnum;
                          return <MenuItem style={{fontFamily: 'Brandon Grotesque Regular'}} key={i} value={type}>{SplitByCapitalLetters(typeName)}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <LockComponent locked={locked} onChange={props.toggleLock} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default QuestionPanelWorkArea
