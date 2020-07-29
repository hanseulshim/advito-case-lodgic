import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { EXPORT_ACTIVITY_DATA_QC, CHECK_EXPORT_ACTIVITY_DATA_QC } from 'api'
import { Button, Modal, Radio } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { exportCsv } from '../helper'
import moment from 'moment'

const StyledRadio = styled(Radio)`
  display: block;
  margin-bottom: 5px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;
`

const Icon = styled(ExclamationCircleOutlined)`
  color: ${props => props.theme.treePoppy};
  margin-right: 1em;
  height: 10px;
`

// DUMB COMPONENT TO RENDER WHILE POLLING
const ExportPolling = ({
  variables,
  setPolling,
  getCsv,
  showSuccess,
  showError
}) => {
  const { data, error } = useQuery(CHECK_EXPORT_ACTIVITY_DATA_QC, {
    variables: { ...variables },
    pollInterval: 5000,
    fetchPolicy: 'network-only'
  })

  if (data && data.checkExportActivityDataQc) {
    getCsv(data.checkExportActivityDataQc)
    showSuccess()
    setPolling(false)
    return null
  }
  if (data && data.checkExportActivityDataQc === '') {
    setPolling(false)
    showError('No activity data is available for exporting.')
  }
  if (error) {
    setPolling(false)
    showError(error.message)
    return null
  }
  return (
    <Modal
      visible={true}
      footer={null}
      closable={false}
      title={'Checking for Activity Data QC Export...'}
    >
      <SpinLoader />
    </Modal>
  )
}

const ActivityDataQc = ({ selectedRecords }) => {
  const globalState = useContext(store)
  const { state } = globalState
  const { clientName } = state
  const [visible, setVisible] = useState(false)
  const [polling, setPolling] = useState(false)
  const [currencyType, setCurrencyType] = useState('')
  const jobIngestionIds = selectedRecords.length
    ? selectedRecords.map(record => record.jobIngestionId)
    : []

  const [exportQC, { loading }] = useMutation(EXPORT_ACTIVITY_DATA_QC, {
    onCompleted: () => {
      setPolling(true)
      setVisible(false)
      setCurrencyType('')
    }
  })

  const toggleModal = () => {
    setVisible(!visible)
    setCurrencyType('')
  }
  const handleCurrencyType = e => {
    setCurrencyType(e.target.value)
  }

  const onOk = async () => {
    const equalTypes = selectedRecords.every(
      obj => obj.type === selectedRecords[0].type
    )
    if (!equalTypes) {
      showError(
        'You must select files for either DPM or Sourcing. You cannot complete the export with both selected.'
      )
      toggleModal()
    } else {
      try {
        await exportQC({
          variables: {
            currencyType,
            jobIngestionIds
          }
        })
      } catch (e) {
        showError(e.message)
        console.error('Error in backout ', e)
      }
    }
  }

  const showError = error => {
    Modal.error({
      title: 'Error in Export',
      content: error
    })
  }

  const showSuccess = () => {
    Modal.success({
      title: 'Success',
      content: 'Successfully exported for Activity Data QC',
      okText: 'Close'
    })
  }

  const getCsv = flatFile => {
    const formattedDate = moment(new Date()).format('YYYY_MM_DD')
    try {
      exportCsv(flatFile, `${clientName}_ActivityDataQc_${formattedDate}`)
    } catch (e) {
      showError(e.message)
      console.error(e)
    }
  }

  return (
    <>
      <Button
        icon={<DownloadOutlined />}
        onClick={toggleModal}
        disabled={!jobIngestionIds.length}
      >
        Activity Data QC Export
      </Button>
      <Modal
        visible={visible}
        title={'Activity Data QC Export'}
        onOk={onOk}
        onCancel={toggleModal}
        confirmLoading={loading}
        okButtonProps={{ disabled: !currencyType ? true : false }}
      >
        <Header>
          <Icon />
          <span>Select a currency for your Activity Data QC Export</span>
        </Header>
        <Radio.Group value={currencyType} onChange={handleCurrencyType}>
          <StyledRadio value={'ingested'}>Ingested Currency</StyledRadio>
          <StyledRadio value={'usd'}>USD Currency</StyledRadio>
        </Radio.Group>
      </Modal>
      {polling && (
        <ExportPolling
          variables={{
            jobIngestionIds
          }}
          setPolling={setPolling}
          getCsv={getCsv}
          showSuccess={showSuccess}
          showError={showError}
        />
      )}
    </>
  )
}

export default ActivityDataQc
