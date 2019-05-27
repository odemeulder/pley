using System;
using System.Globalization;

namespace Pley
{
    public class PleyException : Exception
    {
        public PleyException() : base() {}

        public PleyException(string message) : base(message) { }

        public PleyException(string message, params object[] args) 
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }

    public class PleyNotFoundException : PleyException {
        public PleyNotFoundException() : base() {}

        public PleyNotFoundException(string message) : base(message) { }

        public PleyNotFoundException(string message, params object[] args) 
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }

    }
}