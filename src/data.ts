/* eslint-disable prettier/prettier */

export enum ReportTypes {
    Income="income",
    Expense="expense"
}
export const data: Data = {
  report: [
    {
        id: "uuid",
        source: "Business",
        amount: 7500,
        created_at: new Date(),
        updated_at: new Date(), 
        type: ReportTypes.Expense
    },
    {
        id: "uuid1",
        source: "Dropshipping",
        amount: 9700,
        created_at: new Date(),
        updated_at: new Date(), 
        type: ReportTypes.Expense
        },
        {
        id: "uuid1",
        source: "Dropshipping",
        amount: 9700,
        created_at: new Date(),
        updated_at: new Date(), 
        type: ReportTypes.Expense
        },
        {
            id: "uuid17",
            source: "Youtube",
            amount: 9000,
            created_at: new Date(),
            updated_at: new Date(), 
            type: ReportTypes.Income
        }    
  ],
}

interface Data {
    report: {
        id: string;
        source: string;
        amount: number;
        created_at: Date;
        updated_at: Date;
        type: ReportTypes;
    } []
}

data.report.push({
    id: "uuid",
    source: "Business",
    amount: 7500,
    created_at: new Date(),
    updated_at: new Date(), 
    type: ReportTypes.Expense
})