import GeneralStatistics from "@/Components/Charts/AreaCharts/GeneralStatistics";
import IncomeExpenseEarningsChart from "@/Components/Charts/AreaCharts/IncomeExpenseEarningsChart";
import React from "react";

const HomeDashboard = () => {
    return (
        <div className={"row"}>
            <div className={"col-6"}>
                <div className={"card"}>
                    <div className={"card-header"}>
                        <h5 className={"card-title"}>General Statistic</h5>
                    </div>
                    <div className={"card-body"}>
                        <GeneralStatistics/>
                    </div>
                </div>
            </div>
            <div className={"col-6"}>
                <div className={"card"}>
                    <div className={"card-header"}>
                        <h5 className={"card-title"}>Income Expense Earnings</h5>
                    </div>
                    <div className={"card-body"}>
                        <IncomeExpenseEarningsChart/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeDashboard
