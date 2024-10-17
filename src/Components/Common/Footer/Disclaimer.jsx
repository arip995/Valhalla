import '../../../styles/common/disclaimer.css';
import LearnMoreButton from './LearnMoreButton';

const Disclaimer = ({ showTitle = true }) => {
  return (
    <div className="disclaimer-container">
      {!!showTitle && (
        <div className="disclaimer-title">
          By unlocking the message, you agree to the terms
          and conditions.
        </div>
      )}
      <div className="disclaimer">
        <div className="disclaimer-header">Disclaimer</div>
        <div className="disclaimer-description">
          This disclaimer outlines that POLMI SOFTWARE
          SERVICES TECHNOLOGIES PRIVATE LIMITED, as an
          organization, shall not be held accountable for
          any content or materials disseminated by a content
          creator on or via any app or website affiliated
          with us. By utilizing our services, you
          acknowledge and agree to the terms set forth in
          this disclaimer.
          <LearnMoreButton />
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
