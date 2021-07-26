import { getNamespace, createNamespace } from 'node-request-context';
import { ContextService } from '@general/services/context.service';

export function ContextMiddleware(req, res, next) {
  const rc = new ContextService(req, res);

  const namespace = getNamespace('app.zen') || createNamespace('app.zen');

  namespace.run(() => {
    namespace.set('tid', rc);
    next();
  });
}
