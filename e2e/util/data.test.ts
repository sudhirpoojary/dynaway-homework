export const currentCreatePage = {
  name:
    'work-orders' ||
    'assets' ||
    'requests' ||
    'work-orders' ||
    'work-orders/create' ||
    'job/notes' ||
    'schedule/create',
}
export let savedFilters: { label: string; text: string; icon?: string }[]

export const workOrderFilters = [
  { label: 'List name', text: '' },
  { label: 'View mode', text: '' },
  { label: 'Sort by', text: '', icon: '' },
  { label: 'Active', text: '' },
  { label: 'Asset ID', text: '' },
  { label: 'Criticality', text: '' },
  { label: 'Date range', text: '' },
  { label: 'Functional location', text: '' },
  { label: 'Job type', text: '' },
  { label: 'Job type category', text: '' },
  { label: 'Responsible worker', text: '' },
  { label: 'Responsible worker group', text: '' },
  { label: 'Scheduled worker', text: '' },
  { label: 'Service level', text: '' },
  { label: 'State', text: '' },
  { label: 'Trade', text: '' },
  { label: 'Variant', text: '' },
  { label: 'Work order ID', text: '' },
  { label: 'Work order pool', text: '' },
  { label: 'Work order type', text: '' },
]

export const assetFilters = [
  { label: 'List name', text: '' },
  { label: 'Sort by', text: '', icon: '' },
  { label: 'Active', text: '' },
  { label: 'Asset ID', text: '' },
  { label: 'Asset type', text: '' },
  { label: 'Functional location', text: '' },
  { label: 'Manufacturer and model', text: '' },
  { label: 'Name', text: '' },
  { label: 'Serial number', text: '' },
]

export const requestFilters = [{ label: 'List name', text: '' }]

export const workOrder = [
  { label: 'Asset', text: '' },
  { label: 'Description', text: '' },
  { label: 'Job description', text: '' },
  { label: 'Work order type', text: '' },
  { label: 'Job type', text: '' },
  { label: 'Variant', text: '' },
  { label: 'Trade', text: '' },
  { label: 'Service level', text: '' },
  { label: 'Start', text: '' },
  { label: 'Expected End', text: '' },
  { label: 'Assigned to me', text: '' },
  { label: 'Work order ID', text: '' },
]

export const lineNotes = [
  { label: 'Internal note', text: '' },
  { label: "Workers' remarks", text: '' },
]

export const jobTypeDetails = [
  { jobTypeId: 'Calibration', name: 'Calibration', description: 'Calibrate equipment' },
  {
    jobTypeId: 'Facility assessment',
    name: 'Facility condition assessments',
    description:
      'Facility condition assessment (FCA) or Property Condition Assessment (PCA) is an industry term that describes the process of a qualified group of trained industry professionals performing an analysis of the condition of a facility or group of facilities that may vary in terms of age,design, construction methods and materials.[1][2] The industry professionals are typically architects and engineers of various disciplines and skilled-trade technicians; though engineering and architectural work are not part of the assessment and are excluded in the scope of the assessment. Building diagnostics go beyond FCAs and PCAs to determine solutions to the problems found and predict outcomes of the solutions.',
  },
  { jobTypeId: 'Inspection', name: 'Inspection', description: 'Inspect equipment' },
  { jobTypeId: 'Lubrication', name: 'Grease equipment', description: 'Lubrication job' },
  { jobTypeId: 'Preventive', name: 'Preventive job', description: '' },
  { jobTypeId: 'Repair', name: 'Repair', description: 'Ad hoc repair' },
  { jobTypeId: 'Service', name: 'Service', description: 'Service job' },
  { jobTypeId: 'Tool', name: 'Tool repair', description: 'Tool inspection and repair' },
]

export const saveFilterItems = (filterItem: string, filterOption: string, sortByOrder?: string) => {
  const currentPage = currentCreatePage.name
  if (currentPage === 'work-orders') {
    savedFilters = workOrderFilters
  } else if (currentPage === 'assets') {
    savedFilters = assetFilters
  } else if (currentPage === 'requests') {
    savedFilters = requestFilters
  } else if (currentPage === 'work-orders/create' || 'schedule/create') {
    savedFilters = workOrder
  } else if (currentPage === 'job/notes') {
    savedFilters = lineNotes
  } else {
    throw new Error('No page scope specified')
  }
  const filter = savedFilters.find((obj) => obj.label.toLowerCase() === filterItem.toLowerCase())
  filter!.text = filterOption
  if (sortByOrder) {
    filter!.icon = sortByOrder
  }
}

export const savedValue = (field: string) => {
  const savedFilter = savedFilters.find(
    (filter: { label: string }) => filter.label.toLowerCase() === field.toLowerCase()
  )
  if (savedFilter) {
    return savedFilter.text
  } else {
    throw new Error(field + ': Object property is undefined')
  }
}

export const getSavedSortByOrder = () => {
  const savedFilter = savedFilters.find((filter: { label: string }) => filter.label === 'Sort by')
  if (savedFilter) {
    return savedFilter.icon
  } else {
    throw new Error('Sort by: Object property is undefined')
  }
}

export const getJobTypeDescription = (jobTypeName: string) => {
  const jobTypeObject = jobTypeDetails.find((jobType: { name: string }) => jobType.name === jobTypeName)
  if (jobTypeObject) {
    return jobTypeObject.description
  } else {
    throw new Error(jobTypeName + ': Object property is undefined')
  }
}
