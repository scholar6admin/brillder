import React from 'react'

import { TutorialStep } from './tutorial/TutorialPanelWorkArea';
import { useHistory } from 'react-router-dom';


export interface YourProposalButtonProps {
  tutorialStep: TutorialStep;
  saveBrick(): void;
  isTutorialPassed(): boolean;
}

const YourProposalLink: React.FC<YourProposalButtonProps> = ({
  tutorialStep, saveBrick, isTutorialPassed
}) => {
  const history = useHistory();

  const editProposal = () => {
    if (!isTutorialPassed()) {
      
    } else {
      saveBrick();
      history.push(`/build/new-brick/proposal`);
    }
  }

  const renderZapTooltip = () => {
    if (!isTutorialPassed() && tutorialStep === TutorialStep.Additional) {
      return (
        <div className="additional-tooltip">
          <div className="tooltip-text">Tool Tips</div>
          <button>
            <img alt="" className="additional-tooltip-icon" src="/feathericons/zap-white.png" />
          </button>
        </div>
      );
    }
    return "";
  }

  let className = "proposal-link";
  if (!isTutorialPassed()) {
    if (tutorialStep === TutorialStep.Proposal) {
      className += " white proposal";
    }
  }

  return (
    <div className={className}>
      <div onClick={editProposal}>
        <div className="proposal-edit-icon"/>
        <div className="proposal-text">
          <div style={{lineHeight: 0.9}}>YOUR</div>
          <div style={{lineHeight: 2}}>PROP</div>
          <div style={{lineHeight: 0.9}}>OSAL</div>
        </div>
      </div>
      {renderZapTooltip()}
    </div>
  );
}

export default YourProposalLink;
