<?php

namespace App\Http\Middleware;

use Closure;

class sameDomain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->getSchemeAndHttpHost() == url('/')) {
            return $next($request);
        }
    }
}
