import React from 'react'
import { connect } from 'react-redux'
import { TransitionGroup, Transition } from 'transition-group'
import universal from 'react-universal-component'
import { withStyles } from '@material-ui/core/styles'
import Loading from './Loading'
import Err from '../pages/Error'
import isLoading from '../../selectors/isLoading'

const styles = {
  switcher: {
    position: 'relative',
    margin: 0,
    height: 'calc(100% - 56px)',
    display: 'flex',
    flex: 1,
    '& > div': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      height: '100%',
      width: '100%'
    }
  },
  '@global': {
    '.next .fade-enter': {
      transform: 'translateX(100%)',
      opacity: 0
    },
    '.next .fade-enter-active': {
      transform: 'translateX(0%)',
      opacity: 1,
      transition: 'all 500ms'
    },
    '.next .fade-leave': {
      transform: 'translateX(0%)',
      opacity: 1
    },
    '.next .fade-leave-active': {
      transform: 'translateX(-100%)',
      opacity: 0,
      transition: 'all 500ms'
    },
    '.back .fade-enter': {
      transform: 'translateX(-100%)',
      opacity: 0
    },
    '.back .fade-enter-active': {
      transform: 'translateX(0%)',
      opacity: 1,
      transition: 'all 500ms'
    },
    '.back .fade-leave': {
      transform: 'translateX(0%)',
      opacity: 1
    },
    '.back .fade-leave-active': {
      transform: 'translateX(100%)',
      opacity: 0,
      transition: 'all 500ms'
    }
  }
}

const UniversalComponent = universal(({ page }) => import(`../pages/${page}`), {
  minDelay: 500,
  loading: Loading,
  error: Err
})

//eslint-disable-next-line
const Switcher = ({ page, classes, direction, isLoading }) => (
  <TransitionGroup
    className={`${classes.switcher} ${direction}`}
    duration={500}
    prefix="fade"
  >
    <Transition key={page}>
      <UniversalComponent isLoading={isLoading} page={page} />
    </Transition>
  </TransitionGroup>
)

const mapState = ({ page, direction, ...state }) => ({
  page,
  direction,
  isLoading: isLoading(state)
})

export default connect(mapState)(withStyles(styles)(Switcher))
