import {useState, useEffect} from 'react'
import './index.css' // Assuming your CSS remains the same

const Pagination = props => {
  const {apiCallback, totalPages} = props
  const [pageNo, setPageNo] = useState(1)

  useEffect(() => {
    if (apiCallback && pageNo >= 1) {
      apiCallback(pageNo)
      console.log('pagenum', pageNo)
    }
  }, [pageNo])
  const onNextPage = () => {
    setPageNo(prevPageNo => {
      if (prevPageNo < totalPages) {
        return prevPageNo + 1
      }
      return prevPageNo
    })
  }

  const onPrevPage = () => {
    setPageNo(prevPageNo => {
      if (prevPageNo > 1) {
        return prevPageNo - 1
      }
      return prevPageNo
    })
  }

  return (
    <div className="mb-3 d-flex justify-content-center align-items-center">
      <button
        type="button"
        className="control-btn"
        onClick={onPrevPage}
        disabled={pageNo === 1} // Disable Prev button on the first page
      >
        Prev
      </button>
      <p className="page-no">{pageNo}</p>
      <button
        type="button"
        className="control-btn"
        onClick={onNextPage}
        disabled={pageNo === totalPages} // Disable Next button on the last page
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
