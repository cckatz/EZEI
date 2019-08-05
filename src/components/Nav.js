import React from 'react';
import SkillsPage from '../pages/SkillsPage.js';
import SkillDetail from '../pages/SkillDetail.js';
import ActivitiesList from '../pages/ActivitiesList.js';

import { createStackNavigator } from 'react-navigation';

const AppNavigator = createStackNavigator({
  Home: {
    screen: SkillsPage
  },
  Detail: {
    screen: SkillDetail
  },
  Activities: {
    screen: ActivitiesList
  }

});

export default AppNavigator

