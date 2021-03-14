import React, { Component } from "react";
import http from "../services/http";
import jwtDecode from "jwt-decode";
import "./style.css";

class Dashborad extends Component {
  state = {
    data: [],
    month: 0,
    state: "",
    user: {},
    statelist: ["UP", "MP", "Maharastra"],
    loading: false,
    Month: {
      "01": "Januaruy",
      "02": "Feburary",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "NovNovember",
      12: "DecDecember",
    },
  };
  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = await jwtDecode(jwt);
      this.setState({ user, state: user.state });
      console.log(user);
    } catch (ex) {}
    this.setState({
      loading: true,
    });

    const { data } = await http.get("/dashboard/" + this.state.state);
    this.setState({ data });
    this.setState({
      loading: false,
    });
    console.log(data);
  }
  setmonth(x) {
    this.setState({ month: x });
  }
  async handlestate(x) {
    console.log(x);
    this.setState({ state: x, data: [] });
    this.setState({
      loading: true,
    });
    const { data } = await http.get("/dashboard/" + x);
    console.log(data);
    this.setState({
      loading: false,
    });

    this.setState({ data });
  }

  render() {
    const { data, month, statelist, user, Month } = this.state;
    var x = -1;
    const spin = {
      marginLeft: "30%",
    };
    return (
      <div>
        <br />
        {user.level === "Central" && (
          <form>
            <div class="form-group">
              <label htmlFor="states">
                <h5 className="heading">Choose a State </h5>
              </label>

              <select
                onChange={(value) => this.handlestate(value.target.value)}
                className="form-control"
                name="states"
                id="states"
              >
                {statelist.map((state) => (
                  <option value={state}>{state}</option>
                ))}
              </select>
              <br />
            </div>
          </form>
        )}

        <div>
          <button className="btn monthbtn" onClick={() => this.setmonth(0)}>
            Next Month
          </button>
          {"   "}
          <button className="btn monthbtn" onClick={() => this.setmonth(1)}>
            Second Month
          </button>
          {"   "}
          <button className="btn monthbtn" onClick={() => this.setmonth(2)}>
            Third Month
          </button>
        </div>
        <br />
        <h3 className="heading">Grain Demand for {this.state.state}</h3>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>State</th>
              <th>District</th>
              <th>Month</th>
              <th> Wheat Demand (Metric Tons)</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (dist) =>
                ++x % 3 === month && (
                  <tr className="row1">
                    <th>{dist.State}</th>
                    <td>{dist.Dist}</td>

                    <td>
                      {Month[dist.Month.split("-")[1]] +
                        " " +
                        dist.Month.split("-")[0]}
                    </td>

                    <td>{dist.Demand}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <h3 style={spin}>
          {this.state.loading && (
            <img
              width="240px"
              height="150px"
              src="https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"
            ></img>
          )}
        </h3>
      </div>
    );
  }
}

export default Dashborad;
