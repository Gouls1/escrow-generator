//To handle deployed contracts html windown
export default function Timelocker({
    address,
    beneficiary,
    lockPeriod,
    value,
    role,
    typeOf,
    handleClaim,
 }) {

    if(role == "Beneficiary") {
      return (
          <div className="existing-contract">
            <ul className="fields">
            <li>
                <div> Contract Type: </div>
                <div> {typeOf} </div>
              </li>
            <li>
                <div> Role: </div>
                <div> {role} </div>
              </li>
              <li>
                <div> Contract Address: </div>
                <div> {address} </div>
              </li>
              <li>
                <div> Beneficiary: </div>
                <div> {beneficiary} </div>
              </li>
              <li>
                <div> Lock Period: </div>
                <div> {lockPeriod} day(s) </div>
              </li>
              <li>
                <div> Value: </div>
                <div> {value} </div>
              </li>
              <div
                className="claim-button"
                id={address}
                onClick={(e) => {
                  e.preventDefault();
      
                  handleClaim();
                }}
              >
                Claim
              </div>
            </ul>
          </div>
        );
    }
    else{
      return (
        <div className="existing-contract">
          <ul className="fields">
          <li>
              <div> Contract Type: </div>
              <div> {typeOf} </div>
            </li>
          <li>
              <div> Role: </div>
              <div> {role} </div>
            </li>
            <li>
              <div> Contract Address: </div>
              <div> {address} </div>
            </li>
            <li>
              <div> Beneficiary: </div>
              <div> {beneficiary} </div>
            </li>
            <li>
              <div> Lock Period: </div>
              <div> {lockPeriod} day(s) </div>
            </li>
            <li>
              <div> Value: </div>
              <div> {value} </div>
            </li>
          </ul>
        </div>
      );
    }
 }