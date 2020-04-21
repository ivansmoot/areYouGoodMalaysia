export default function ({ isHMR, app, store, route, params, error, redirect }) {
  if (route.fullPath === '/') {
    return redirect('/firstpage')
  }
}
