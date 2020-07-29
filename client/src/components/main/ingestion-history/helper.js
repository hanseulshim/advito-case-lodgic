import React from 'react'
import { formatDate } from 'helper'

const getColor = status => (status === 'Approved' ? 'green' : 'red')

const Text = ({ type, status, date }) => {
  return (
    <div style={{ color: getColor(status), fontSize: '.8em' }}>
      <span>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : null} for{' '}
        {type}
      </span>
      <br />
      <span> {formatDate(date)}</span>
    </div>
  )
}

export const getStatus = record => {
  const {
    isDpm,
    statusDpm,
    dateStatusDpm,
    isSourcing,
    statusSourcing,
    dateStatusSourcing
  } = record

  const displayArr = []

  if (isDpm) {
    displayArr.push(
      <Text type={'DPM'} status={statusDpm} date={dateStatusDpm} />
    )
  }
  if (isSourcing) {
    displayArr.push(
      <Text
        type={'Sourcing'}
        status={statusSourcing}
        date={dateStatusSourcing}
      />
    )
  }

  return displayArr.length
    ? displayArr.map((el, i) => ({ ...el, key: i }))
    : 'Open'
}

export const exportCsv = (flatFile, fileName) => {
  const hiddenElement = document.createElement('a')
  hiddenElement.href = `https://advito-ingestion-templates.s3.us-east-2.amazonaws.com/${flatFile}`
  console.log(
    `https://advito-ingestion-templates.s3.us-east-2.amazonaws.com/${flatFile}`
  )
  hiddenElement.target = '_blank'
  hiddenElement.download = `${fileName}.csv`
  hiddenElement.click()
}

export const getYears = () => {
  const current = new Date().getFullYear()
  return [
    current - 5,
    current - 4,
    current - 3,
    current - 2,
    current - 1,
    current,
    current + 1
  ]
}

export const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 }
]
