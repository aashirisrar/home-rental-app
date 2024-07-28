interface rental {
propertyId: number,
startDate: string,
endDate: string,
totalRent: number
}

const RentalDetailsComponent = ({propertyId, startDate, endDate, totalRent}:rental) => {
  return (
    <div className="flex flex-col gap-3">
        <div>Property Id: {propertyId}</div>
        <div>Start Date: {startDate}</div>
        <div>End Date: {endDate}</div>
        <div>Total Rent: {totalRent}</div>
    </div>
  )
}

export default RentalDetailsComponent