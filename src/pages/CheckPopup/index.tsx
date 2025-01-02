import Modal from './../../components/modal'
import React, { FC, Fragment, useState } from 'react'
import TypeChecks from './TypeChecks'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import {
  agencyDefaultValues,
  agencyprops,
  checkOptions,
  individualDefaultValues,
  individualprops,
} from 'src/utilities/parsers'
import Button from './../../components/button'

interface props {
  open: boolean
  toggle: () => void
  handler: (options: checkOptions) => void
}

const CheckPopup: FC<props> = ({ open, toggle, handler }) => {
  const [checkOptions, setOptions] = useState({
    individual: {
      individualName: true,
      individualPhone: true,
      individualEmail: true,
      individualLinkedin: true,
      individualProfileImage: true,
      individualGit: true,
    },
    agency: {
      agencyEmail: true,
      agencyPhone: true,
      agencyLogo: true,
      agencyAddress: true,
      agencyWebLink: true,
    },
  })

  const onChange = (checkedValues: CheckboxValueType[], optionType: 'individual' | 'agency') => {
    Object.keys(checkOptions[optionType]).forEach((valueKey: any) => {
      if (checkedValues.includes(valueKey)) {
        setOptions((prev: any) => {
          return { ...prev, [optionType]: { ...prev[optionType], [valueKey]: true } }
        })
      } else
        setOptions((prev: any) => {
          return { ...prev, [optionType]: { ...prev[optionType], [valueKey]: false } }
        })
    })
  }

  const localHandler = () => {
    handler({ ...checkOptions.individual, ...checkOptions.agency })
  }

  return (
    <div className='ind-age-cnt'>
      <Modal isOpen={open} toggle={toggle} width='808px'>
        <Fragment>
          <div className='main-t'>Download Selection</div>
          <div className='individual-agency-row'>
            <TypeChecks
              onChange={onChange}
              defaultValues={individualDefaultValues}
              {...individualprops}
              optionType='individual'
            />
            <TypeChecks onChange={onChange} defaultValues={agencyDefaultValues} {...agencyprops} optionType='agency' />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button label='Done' background='#5557D4' onClick={localHandler} className='pop-btn'></Button>
          </div>
        </Fragment>
      </Modal>
    </div>
  )
}

export default CheckPopup
