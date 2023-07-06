export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
  handleCancel,
  role,
  typeOf,
}) {

  if(role == "Deployer" || role == "Beneficiary") {
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
              <div> Arbiter </div>
              <div> {arbiter} </div>
            </li>
            <li>
              <div> Beneficiary </div>
              <div> {beneficiary} </div>
            </li>
            <li>
              <div> Value </div>
              <div> {value} </div>
            </li>
          </ul>
        </div>
      );
  }
  else if(role == "Arbiter") {
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
              <div> Arbiter </div>
              <div> {arbiter} </div>
            </li>
            <li>
              <div> Beneficiary </div>
              <div> {beneficiary} </div>
            </li>
            <li>
              <div> Value </div>
              <div> {value} </div>
            </li>
            <div
              className="approve-button"
              id={address}
              onClick={(e) => {
                e.preventDefault();

                handleApprove();
              }}
            >
              Approve
            </div>
            <div
              className="cancel-button"
              id={address}
              onClick={(e) => {
                e.preventDefault();
                
                handleCancel();

              }}
            >
              Cancel
            </div>
          </ul>
        </div>
      );
  }
}
