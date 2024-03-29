import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrUpdateUser } from "../store/user";

import {
  selectIsConnected,
  selectUserFirstName,
  selectUserLastName,
} from "../store/selector";

import { useDispatch, useSelector } from "react-redux";
import EditNameForm from "./EditNameForm";


function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const isConnected = useSelector(selectIsConnected());
  
  const userFirstName = useSelector(selectUserFirstName());
  const userLastName = useSelector(selectUserLastName());


 

  useEffect(() => {
    dispatch(fetchOrUpdateUser);
  }, [dispatch]);

  useEffect(() => {
    if (!isConnected ) {
      navigate("/content");
    }
  }, [isConnected, navigate]);

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userFirstName && userFirstName} {userLastName && userLastName}!
          </h1>
          <EditNameForm/>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </>
  );
}
export default User;
