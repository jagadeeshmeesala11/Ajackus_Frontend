console.log('started')

export function showView(viewId) {
  const views = ['dashboardView', 'addFormView'];
  views.forEach(id => {
    document.getElementById(id).style.display = (id === viewId) ? 'block' : 'none';
  });
}

showView('dashboardView');