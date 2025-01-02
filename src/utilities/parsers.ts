import moment from 'moment'
import { getBuffer } from 'src/store'

const parseExperience = (experience: any) => {
  const { experienceType, startsFrom } = experience
  return {
    ...experience,
    dateFormat: `${moment(startsFrom).format('MMM YYYY')} - ${
      experienceType === 'past' ? ' ' + moment(experience?.endsTo).format('MMM YYYY') : 'Present'
    } `,
  }
}

const parseCertificates = (certificate: any) => {
  const { certStartsFrom, certEndsTo } = certificate
  return {
    ...certificate,
    dateFormat: `${moment(certStartsFrom).format('YYYY')} - ${moment(certEndsTo).format('YYYY')}`,
  }
}

const parseAcademics = (academic: any) => {
  const { academicStartsFrom, academicEndsTo } = academic
  return {
    ...academic,
    dateFormat: `${moment(academicStartsFrom).format('YYYY')} - ${moment(academicEndsTo).format('YYYY')}`,
  }
}
const parseSkills = (profileSkills: any) => {
  const skills: any = {
    TECHNICAL: [],
    NON_TECHNICAL: [],
    TOOLS: [],
  }
  profileSkills?.length > 0 &&
    profileSkills?.forEach((skill: any) => {
      if (skills[skill.skillType]) {
        skills[skill.skillType] = [...skills[skill.skillType], skill]
      }
    })

  return skills
}

export const parsingProfileData = (profile: any) => {
  return {
    ...profile.basicInfo,
    awards: profile?.awardsAndHonors,
    projects: profile?.projects,
    profileId: profile?._id,
    designation: profile.basicInfo?.designation?.title,
    profileName: profile.profileName,
    experiences: profile.experiences.map(parseExperience),
    certificates: profile.certificates.map(parseCertificates),
    academics: profile.academics.map(parseAcademics),
    skills: parseSkills(profile.skills),
    employeeId: profile.employeeId,
  }
}

export const individualOptions = [
  { label: 'Name', value: 'individualName' },
  { label: 'Phone', value: 'individualPhone' },
  { label: 'Email', value: 'individualEmail' },
  { label: 'LinkedIn', value: 'individualLinkedin' },
  { label: 'Profile Picture', value: 'individualProfileImage' },
  { label: 'Git/Bit Bucket', value: 'individualGit' },
]

export const individualDefaultValues = [
  'individualName',
  'individualPhone',
  'individualEmail',
  'individualLinkedin',
  'individualProfileImage',
  'individualGit',
]

export const agencyOptions = [
  { label: 'Email', value: 'agencyEmail' },
  { label: 'Phone', value: 'agencyPhone' },
  { label: 'Logo', value: 'agencyLogo' },
  { label: 'Address', value: 'agencyAddress' },
  { label: 'Web link', value: 'agencyWebLink' },
]

export const agencyDefaultValues = ['agencyEmail', 'agencyPhone', 'agencyLogo', 'agencyAddress', 'agencyWebLink']

export interface checkOptions {
  individualName: boolean
  individualPhone: boolean
  individualEmail: boolean
  individualLinkedin: boolean
  individualProfileImage: boolean
  individualGit: boolean
  agencyEmail: boolean
  agencyPhone: boolean
  agencyLogo: boolean
  agencyAddress: boolean
  agencyWebLink: boolean
}

export const individualprops = {
  title: 'Individual',
  icon: '/assets/individual.svg',
  options: individualOptions,
  subTitle: 'Please select options that you want in resume ',
}

export const agencyprops = {
  title: 'Agency',
  icon: '/assets/agency.svg',
  options: agencyOptions,
  subTitle: 'Please select options that you want in resume ',
}

export const getPdf = async (options: checkOptions, profileId: string, profileName?: string) => {
  const resp = await getBuffer(options, profileId)
  const data = resp?.data

  const file = new Blob([data], { type: 'application/pdf' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', profileName || '')
  document.body.appendChild(link)
  link.click()
}
