// ./Provider.js
import React, {useMemo, useCallback, useState, createPortal} from 'react';


export const DialogContext = React.createContext();

export const Provider = ({ children, node, Layout, config }) => {
  const [instances, setInstances] = useState([]);
  const [events, setEvents] = useState([]);

  const close = useCallback(() => {
    const { resolve } = events[events.length - 1];
    const resolveParams = { action: 'close' };

    setInstances(prevInstances => prevInstances.filter((_, index) => index !== prevInstances.length - 1));
    setEvents(prevEvents => prevEvents.filter((_, index) => index !== prevEvents.length - 1));

    resolve(resolveParams);
  }, [events]);

  const cancel = useCallback((values) => {
    const { resolve } = events[events.length - 1];
    const resolveParams = { action: 'cancel', values };

    setInstances(prevInstances => prevInstances.filter((_el, index) => index !== prevInstances.length - 1));
    setEvents(prevEvents => prevEvents.filter((_el, index) => index !== prevEvents.length - 1));

    resolve(resolveParams);
  },  [events]);

  const success = useCallback((values) => {
      const { resolve } = events[events.length - 1];
      const resolveParams = { action: 'success', values };

      setInstances(prevInstances => prevInstances.filter((_el, index) => index !== prevInstances.length - 1));
      setEvents(prevEvents => prevEvents.filter((_el, index) => index !== prevEvents.length - 1));

      resolve(resolveParams);
    }, [events]);

  const context = {
    instances,
    setInstances,
    config,
    events,
    setEvents
  };

  const Component = instances.map(instance => (
    <Layout
      key={instance.instanceName}
      component={config[instance.instanceName]}
      cancel={cancel}
      success={success}
      close={close}
      {...instance}
    />
  ));


  // При изменении state не обновляем дочерние компоненты
  const child = useMemo(() => React.Children.only(children), [children]);

  return (
    <DialogContext.Provider value={context}>
      <>
        {child}
        {createPortal(Component, node)}
      </>
    </DialogContext.Provider>
  );
};













/*



onSomethingClicked = async () => {
        const ok = await AsyncConfirm({
            text: Localizer.get('app.something.confirm'),
            okButtonText:Localizer.get('dialog.yes'),
            noButtonText: Localizer.get('dialog.no'),
        });

        if(ok){
            TransportController.get('/api/user/something')
                .then(data => {
                   doAnything(data)
                })
                .catch(error => {
                    feedback.error(STATUS.FAILURE, error);
                });
        }
        
    };



















*/