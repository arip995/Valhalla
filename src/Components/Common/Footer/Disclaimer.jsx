import '../../../styles/common/disclaimer.css';
import LearnMoreButton from './LearnMoreButton';

const Disclaimer = ({ showTitle = true, isSebi }) => {
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
          {isSebi ? (
            <>
              The Creator is not a SEBI registered or
              qualified investment advisor. The Creator
              compiles data, content and information from
              various sources with due care and caution. The
              channel/group is for informational,
              educational and discussion purposes only. Even
              though topics may be discussed on the
              channel/group that involve investment issues,
              nothing on the channel shall be deemed to
              constitute the practice of investment advice.
              However, it is important to note that the
              advice may vary based on individual
              circumstances, and the information provided
              should not be considered as a substitute for
              advice from a qualified professional. Neither
              the Creator, and where applicable, nor its
              directors, principals, agents, associates nor
              employees, are licensed to provide investment
              advice. You are encouraged to consult with a
              qualified expert or professional to address
              your specific needs and circumstances.
              <br />
            </>
          ) : null}
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
